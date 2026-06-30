"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { account } from '@/lib/appwrite';
import { ID } from 'appwrite';

const imgEllipse = "http://localhost:3845/assets/dc6fd644081f6c763672753bacdb6f9edcf582f7.svg";
const imgEllipse1 = "http://localhost:3845/assets/d77b2d8e03d02d007a93aeef2aa48b9326024603.svg";
const imgFrame = "http://localhost:3845/assets/5374cbe708a4f89048554ba88bece69653180eae.svg";
const imgFrame1 = "http://localhost:3845/assets/6ed3fb838cb3896e675ae11fdb51ae469b0d0d5a.svg";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams?.get('mode') === 'signup' ? 'signup' : 'login';
  
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    account.get().then(() => {
      router.push('/home');
    }).catch(() => {});
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        await account.create(ID.unique(), email, password, name || 'User');
        await account.createEmailPasswordSession(email, password);
      } else {
        await account.createEmailPasswordSession(email, password);
      }
      router.push('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--color\/canvas,#242423)] relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden" data-node-id="67:2" data-name="Auth — Sign in">
      <div className="absolute left-[-80px] size-[500px] top-[-60px]" data-node-id="67:3" data-name="Ellipse">
        <div className="absolute inset-[-24%]">
          <img alt="" className="block max-w-none size-full" src={imgEllipse} />
        </div>
      </div>
      <div className="absolute right-0 size-[400px] bottom-0" data-node-id="67:4" data-name="Ellipse">
        <div className="absolute inset-[-25%]">
          <img alt="" className="block max-w-none size-full" src={imgEllipse1} />
        </div>
      </div>

      <div className="z-10 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.12)] border-solid content-stretch flex flex-col gap-[24px] items-center overflow-clip p-[40px] relative rounded-[24px] shrink-0 w-[442px]" data-node-id="67:6" data-name="Frame">
        <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-node-id="67:7" data-name="Frame">
          <p className="[word-break:break-word] font-['Geist:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[20px] text-[color:var(--color\/text-primary,#e8eddf)] tracking-[-0.2px] whitespace-nowrap" data-node-id="67:11">
            bereft
          </p>
        </div>
        
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-center leading-[normal] overflow-clip relative shrink-0 text-center w-full whitespace-nowrap" data-node-id="67:12" data-name="Frame">
          <p className="font-['Geist:Bold'] font-bold relative shrink-0 text-[28px] text-[color:var(--color\/text-primary,#e8eddf)] tracking-[-0.28px]" data-node-id="67:13">
            {mode === 'login' ? 'Welcome back' : 'Create an account'}
          </p>
          <p className="font-['Geist:Regular'] font-normal relative shrink-0 text-[15px] text-[color:var(--color\/text-tertiary,#9fa8a2)]" data-node-id="67:14">
            {mode === 'login' ? 'Sign in to continue to bereft' : 'Sign up to continue to bereft'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full" data-node-id="67:15" data-name="Frame">
          {mode === 'signup' && (
            <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="67:16" data-name="Frame">
              <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color\/text-secondary,#cfdbd5)] whitespace-nowrap" data-node-id="67:17">
                Name
              </p>
              <input 
                type="text"
                placeholder="Nathan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-[rgba(255,255,255,0.04)] border border-[var(--color\/border,#40403e)] border-solid content-stretch flex items-center overflow-clip px-[16px] py-[14px] relative rounded-[12px] shrink-0 w-full outline-none text-[color:var(--color\/text-primary,#e8eddf)] focus:border-[#f5cb5c] transition-colors"
              />
            </div>
          )}

          <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="67:16" data-name="Frame">
            <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color\/text-secondary,#cfdbd5)] whitespace-nowrap" data-node-id="67:17">
              Email
            </p>
            <input 
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[rgba(255,255,255,0.04)] border border-[var(--color\/border,#40403e)] border-solid content-stretch flex items-center overflow-clip px-[16px] py-[14px] relative rounded-[12px] shrink-0 w-full outline-none text-[color:var(--color\/text-primary,#e8eddf)] focus:border-[#f5cb5c] transition-colors"
            />
          </div>

          <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="67:20" data-name="Frame">
            <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color\/text-secondary,#cfdbd5)] whitespace-nowrap" data-node-id="67:21">
              Password
            </p>
            <div className="bg-[rgba(255,255,255,0.04)] border border-[var(--color\/border,#40403e)] border-solid content-stretch flex items-center overflow-clip px-[16px] py-[14px] relative rounded-[12px] shrink-0 w-full focus-within:border-[#f5cb5c] transition-colors" data-node-id="67:22" data-name="Frame">
              <input 
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-transparent border-none outline-none text-[color:var(--color\/text-primary,#e8eddf)] flex-1 w-full"
              />
              <div className="relative shrink-0 size-[18px] ml-[10px]" data-node-id="67:25" data-name="Frame">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame} />
              </div>
            </div>
          </div>

          {error && <div className="text-red-400 text-[13px]">{error}</div>}

          {mode === 'login' && (
            <div className="content-stretch flex items-start justify-end overflow-clip relative shrink-0 w-full cursor-pointer" data-node-id="67:28" data-name="Frame">
              <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[13px] text-[color:var(--color\/accent,#f5cb5c)] whitespace-nowrap" data-node-id="67:29">
                Forgot password?
              </p>
            </div>
          )}

          <button type="submit" disabled={loading} className="bg-gradient-to-r content-stretch flex from-[#f5cb5c] items-center justify-center overflow-clip py-[16px] relative rounded-[14px] shadow-[0px_8px_24px_0px_rgba(245,203,92,0.35)] shrink-0 to-[#f9db7a] w-full cursor-pointer disabled:opacity-50" data-node-id="67:30" data-name="Frame">
            <p className="[word-break:break-word] font-['Geist:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[16px] text-[color:var(--color\/on-accent,#242423)] whitespace-nowrap" data-node-id="67:31">
              {loading ? 'Processing...' : (mode === 'login' ? 'Sign in' : 'Sign up')}
            </p>
          </button>
        </form>

        <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full" data-node-id="67:32" data-name="Frame">
          <div className="bg-[var(--color\/border,#40403e)] flex-[1_0_0] h-px min-w-px relative" data-node-id="67:33" data-name="Rectangle" />
          <p className="[word-break:break-word] font-['Geist:Regular'] font-normal leading-[normal] relative shrink-0 text-[12px] text-[color:var(--color\/text-tertiary,#9fa8a2)] whitespace-nowrap" data-node-id="67:34">
            or continue with
          </p>
          <div className="bg-[var(--color\/border,#40403e)] flex-[1_0_0] h-px min-w-px relative" data-node-id="67:35" data-name="Rectangle" />
        </div>

        <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="67:36" data-name="Frame">
          <div className="bg-[rgba(255,255,255,0.04)] border border-[var(--color\/border,#40403e)] border-solid content-stretch flex flex-[1_0_0] gap-[10px] items-center min-w-px overflow-clip px-[16px] py-[12px] relative rounded-[12px] cursor-pointer" data-node-id="67:37" data-name="Frame">
            <div className="relative shrink-0 size-[16px]" data-node-id="67:38" data-name="Frame">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame1} />
            </div>
            <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[14px] text-[color:var(--color\/text-primary,#e8eddf)] whitespace-nowrap" data-node-id="67:40">
              Google
            </p>
          </div>
          <div className="bg-[rgba(255,255,255,0.04)] border border-[var(--color\/border,#40403e)] border-solid content-stretch flex flex-[1_0_0] gap-[10px] items-center min-w-px overflow-clip px-[16px] py-[12px] relative rounded-[12px] cursor-pointer" data-node-id="67:41" data-name="Frame">
            <div className="relative shrink-0 size-[16px]" data-node-id="67:42" data-name="Frame">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame1} />
            </div>
            <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[normal] relative shrink-0 text-[14px] text-[color:var(--color\/text-primary,#e8eddf)] whitespace-nowrap" data-node-id="67:44">
              GitHub
            </p>
          </div>
        </div>

        <div className="[word-break:break-word] content-stretch flex gap-[6px] items-center leading-[normal] overflow-clip relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="67:45" data-name="Frame">
          <p className="font-['Geist:Regular'] font-normal relative shrink-0 text-[color:var(--color\/text-tertiary,#9fa8a2)]" data-node-id="67:46">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
          </p>
          <p className="font-['Geist:SemiBold'] font-semibold relative shrink-0 text-[color:var(--color\/accent,#f5cb5c)] cursor-pointer" data-node-id="67:47" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? "Sign up" : "Sign in"}
          </p>
        </div>
      </div>
    </div>
  );
}
