import subprocess,re,json,sys,os
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'../../../..'))
def g(*a): return subprocess.run(['git','-C',R,*a],capture_output=True,text=True,errors='replace').stdout
PATHS=['curriculum/trainings','curriculum/exercises','curriculum/lectures','curriculum/slides','curriculum/prompts']
SIG=re.compile(r"card|ruling|ruled|maintainer'?s? (call|own|line|word|sentence|lens|method|pick)|maintainer[:)]|\(maintainer|antti'?s|antti:|prompt-ok|kept with|maintainer-commissioned|confirmed by antti",re.I)
log=g('log','--no-merges','--format=%H\x1f%ad\x1f%an\x1f%s','--date=short','--',*PATHS)
out=[]
for line in log.splitlines():
    h,d,a,s=line.split('\x1f')
    sig=bool(SIG.search(s))
    diff=g('show','-U0','--format=','--no-renames',h,'--',*PATHS)
    cur=None; hunks=[]
    for l in diff.splitlines():
        if l.startswith('+++ '): cur=l[6:] if l.startswith('+++ b/') else None
        elif l.startswith('@@'):
            m=re.match(r'@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@',l)
            hunks.append({'file':cur,'new':int(m.group(3)),'del':[],'add':[]})
        elif hunks and l.startswith('-') and not l.startswith('---'): hunks[-1]['del'].append(l[1:])
        elif hunks and l.startswith('+') and not l.startswith('+++'): hunks[-1]['add'].append(l[1:])
    files={}
    for hk in hunks:
        if not hk['file'] or not hk['file'].endswith('.md'): continue
        if not hk['del'] or not hk['add'] or len(hk['del'])>3 or len(hk['add'])>3: continue
        b=' '.join(x.strip() for x in hk['del']).strip(); af=' '.join(x.strip() for x in hk['add']).strip()
        if b==af or len(b)<25 or len(af)<15: continue
        if re.match(r'^(<!--|\||---|[a-z_]+:\s|```|\[.*\]\(.*\)$)',b) or '<!--' in b+af: continue
        if hk['file'] not in files:
            t=g('show',f'{h}:{hk["file"]}').splitlines()
            mk=next((i for i,x in enumerate(t) if x.strip().startswith('<!-- maintainer')),len(t))
            files[hk['file']]=mk
        if hk['new']-1>=files[hk['file']]: continue
        out.append({'sha':h[:8],'date':d,'author':a,'subject':s,'signal':sig,'file':hk['file'],'before':b,'after':af})
json.dump(out,open(sys.argv[1],'w'),indent=0)
import collections
print(len(out), sum(o['signal'] for o in out))
print(collections.Counter((o['file'].split('/')[2] if o['file'].startswith('curriculum/trainings') else o['file'].split('/')[1]) for o in out).most_common(12))
