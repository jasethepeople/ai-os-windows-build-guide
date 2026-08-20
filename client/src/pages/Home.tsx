/**
 * Signal Blueprint page: technical-editorial composition with an offset command rail,
 * warm paper surfaces, focused build steps, and a restrained signal-orange accent.
 */
import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clipboard,
  Code2,
  Command,
  Copy,
  Download,
  ExternalLink,
  FileArchive,
  FileCode2,
  FolderOpen,
  HardDriveDownload,
  Info,
  Laptop,
  MonitorCog,
  PackageCheck,
  ShieldAlert,
  TerminalSquare,
  Wrench,
  XCircle,
} from "lucide-react";

const assets = {
  mark: "/manus-storage/ai-os-build-mark_58905169.png",
  hero: "/manus-storage/ai-os-build-hero_64a8c58e.png",
  blueprint: "/manus-storage/ai-os-build-blueprint_9a8b49da.png",
  troubleshoot: "/manus-storage/ai-os-build-troubleshoot_aaee08fb.png",
};

const windowsInstall = "pip install pyinstaller";
const windowsBuild = "pyinstaller ai_os.spec";
const wslInstall = "sudo apt-get update\nsudo apt-get install python3-dev binutils\npip3 install pyinstaller";
const wslBuild = "cd ~/ai_os_windows_ultimate\npyinstaller ai_os.spec";
const optimization = "pyinstaller --onefile --strip --upx-dir=C:\\upx ai_os_launcher.py";
const requirements = "pip install -r requirements.txt";
const releaseChecksum = "3609e629ce35f0087fde1b9e516f6339711a65a232fbbb2a85d09eab073597d8";
const certutilVerify = "certutil -hashfile AI_Operating_System_Windows_ULTIMATE_FIXED.zip SHA256";
const powershellVerify = "Get-FileHash .\\AI_Operating_System_Windows_ULTIMATE_FIXED.zip -Algorithm SHA256";

type CopyButtonProps = {
  value: string;
  label?: string;
  light?: boolean;
};

function CopyButton({ value, label = "Copy", light = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button className={`copy-button${light ? " copy-button--light" : ""}`} type="button" onClick={copy} aria-label={`Copy text: ${value}`}>
      {copied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} strokeWidth={2.2} />}
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}

function CommandSlip({ language = "CMD", command }: { language?: string; command: string }) {
  return (
    <div className="command-slip">
      <div className="command-slip__meta">
        <span>{language}</span>
        <CopyButton value={command} />
      </div>
      <pre>{command}</pre>
    </div>
  );
}

function RailLink({ number, label, href }: { number: string; label: string; href: string }) {
  return (
    <a className="rail-link" href={href}>
      <span>{number}</span>
      <b>{label}</b>
    </a>
  );
}

function Step({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="build-step">
      <div className="build-step__number">{number}</div>
      <div className="build-step__body">
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}

function TroubleItem({ title, detail, command }: { title: string; detail: string; command?: string }) {
  return (
    <article className="trouble-item">
      <div className="trouble-item__icon"><Wrench size={17} /></div>
      <div>
        <h3>{title}</h3>
        <p>{detail}</p>
        {command ? <CommandSlip command={command} /> : null}
      </div>
    </article>
  );
}

export default function Home() {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#overview" aria-label="AI OS Build Guide home">
          <img src={assets.mark} alt="AI OS Build Guide mark" />
          <span>AI OS <i>Build Guide</i></span>
        </a>
        <div className="topbar__meta"><span className="status-dot" /> Windows build field manual</div>
        <a className="topbar__action" href="#release">Get the release <ArrowDownRight size={17} /></a>
      </header>

      <main>
        <section className="hero" id="overview">
          <div className="hero__grain" />
          <img className="hero__art" src={assets.hero} alt="Abstract build artifact with a command module and executable tile" />
          <div className="hero__copy">
            <div className="eyebrow"><span /> Windows / PyInstaller / field manual</div>
            <h1>Build once.<br /><em>Hand off</em> one executable.</h1>
            <p>Follow the correct Windows path to package your Python application, locate the artifact, and validate it before distribution.</p>
            <div className="hero__actions">
              <a className="button button--signal" href="#release">Download the package <Download size={17} /></a>
              <a className="button button--quiet" href="#verification">Verify the artifact</a>
            </div>
          </div>
          <aside className="artifact-card" aria-label="Expected output artifact">
            <div className="artifact-card__label"><PackageCheck size={16} /> expected output</div>
            <div className="artifact-card__icon"><FileArchive size={31} /></div>
            <code>dist\AI_Operating_System.exe</code>
            <p>Native Windows executable<br />after a successful build.</p>
            <div className="artifact-card__footer"><span /> Build target: Windows</div>
          </aside>
        </section>

        <section className="release-band" id="release" aria-label="Latest release package">
          <div className="release-band__intro">
            <span className="section-kicker">Current release package</span>
            <h2>Download the source package.</h2>
            <p>Extract this ZIP on a Windows machine, then use the build instructions below to create and validate the native executable.</p>
          </div>
          <div className="release-card">
            <div className="release-card__file-icon"><FileArchive size={27} /></div>
            <div className="release-card__details">
              <div className="release-card__eyebrow"><span /> latest available archive</div>
              <strong>AI_Operating_System_Windows_ULTIMATE_FIXED.zip</strong>
              <p>ZIP package · 0.5 MB · fixed source and build assets</p>
              <dl className="release-meta">
                <div><dt>Version</dt><dd>v1.0.0</dd></div>
                <div><dt>Released</dt><dd>July 19, 2025</dd></div>
              </dl>
              <div className="release-checksum">
                <span>SHA-256</span>
                <code>{releaseChecksum}</code>
                <CopyButton value={releaseChecksum} label="Copy SHA-256" light />
              </div>
            </div>
            <a className="release-download" href="/manus-storage/AI_Operating_System_Windows_ULTIMATE_FIXED_90766475.zip" download="AI_Operating_System_Windows_ULTIMATE_FIXED.zip">
              <Download size={18} /> Download ZIP
            </a>
          </div>
          <p className="release-note"><Info size={15} /> This is a source package, not a pre-built Windows executable. Follow the native build path to produce the <code>.exe</code>.</p>
        </section>

        <div className="guide-frame">
          <aside className="guide-rail" aria-label="Guide sections">
            <div className="guide-rail__intro">
              <p>Build sequence</p>
              <strong>05 stages</strong>
            </div>
            <nav>
              <RailLink number="00" label="Release center" href="#release-center" />
              <RailLink number="01" label="Native build" href="#method-windows" />
              <RailLink number="02" label="Alternatives" href="#alternatives" />
              <RailLink number="03" label="Troubleshoot" href="#troubleshooting" />
              <RailLink number="04" label="Verify & hand off" href="#verification" />
            </nav>
            <div className="rail-note"><Info size={16} /><p>Build on Windows for a native <code>.exe</code>. WSL produces a Linux executable.</p></div>
          </aside>

          <div className="guide-content">
            <section className="intro-strip" aria-label="Build expectations">
              <div>
                <span className="section-kicker">The shortest reliable path</span>
                <h2>Native Windows build</h2>
              </div>
              <p>Use the bundled specification file when available. It captures the packaging configuration so the build command stays consistent.</p>
              <div className="intro-strip__chips">
                <span><MonitorCog size={15} /> Windows 10/11</span>
                <span><TerminalSquare size={15} /> Python 3.8+</span>
              </div>
            </section>

            <section className="section-block release-center" id="release-center">
              <div className="section-heading">
                <div><span className="section-kicker">00 / release center</span><h2>Everything needed to evaluate this package.</h2></div>
                <p>Verify the archive, confirm the environment, understand the release context, and know what to provide if a build needs support.</p>
              </div>

              <div className="release-center-grid">
                <article className="integrity-card">
                  <div className="integrity-card__heading"><ShieldAlert size={23} /><div><span className="card-label">Integrity check</span><h3>Verify the download first.</h3></div></div>
                  <p>Run one of these commands from the folder that contains the downloaded ZIP. The returned hash must match the expected SHA-256 value below.</p>
                  <div className="expected-hash"><span>Expected SHA-256</span><code>{releaseChecksum}</code><CopyButton value={releaseChecksum} label="Copy expected hash" /></div>
                  <CommandSlip language="COMMAND PROMPT" command={certutilVerify} />
                  <CommandSlip language="POWERSHELL" command={powershellVerify} />
                </article>

                <article className="compatibility-card">
                  <div className="compatibility-card__heading"><MonitorCog size={22} /><div><span className="card-label">Compatibility</span><h3>Target environment</h3></div></div>
                  <table className="compatibility-table">
                    <thead><tr><th>Component</th><th>Requirement</th><th>Status</th></tr></thead>
                    <tbody>
                      <tr><td>Build host</td><td>Windows 10 or 11</td><td><span className="matrix-status">Documented</span></td></tr>
                      <tr><td>Python</td><td>3.8 or newer, on PATH</td><td><span className="matrix-status">Required</span></td></tr>
                      <tr><td>Packager</td><td>PyInstaller</td><td><span className="matrix-status">Required</span></td></tr>
                      <tr><td>WSL path</td><td>Linux output only</td><td><span className="matrix-status matrix-status--muted">Alternative</span></td></tr>
                    </tbody>
                  </table>
                  <div className="compatibility-note"><Info size={16} /><p>The archive is a source package. Use the Windows build path when the intended output is a native <code>.exe</code>.</p></div>
                </article>
              </div>

              <div className="release-detail-grid">
                <article className="release-detail-card">
                  <div className="release-detail-card__title"><PackageCheck size={20} /><div><span className="card-label">Release notes</span><h3>v1.0.0 / Fixed source package</h3></div></div>
                  <p>This release contains the source package, Windows-oriented setup scripts, a PyInstaller configuration, and the accompanying build documentation.</p>
                  <div className="detail-checks">
                    <span><CheckCircle2 size={16} /> Package extraction and setup guidance</span>
                    <span><CheckCircle2 size={16} /> Launcher and build-configuration assets</span>
                    <span><CheckCircle2 size={16} /> Build, verification, and distribution guidance</span>
                  </div>
                </article>

                <article className="release-detail-card release-detail-card--timeline">
                  <div className="release-detail-card__title"><Command size={20} /><div><span className="card-label">Changelog</span><h3>Release history</h3></div></div>
                  <div className="changelog-item">
                    <div><b>v1.0.0</b><span>July 19, 2025</span></div>
                    <p>Initial fixed source package published with the included setup, launch, packaging, and guidance materials.</p>
                  </div>
                  <p className="future-release-note">Future releases should add a new dated entry here, update the download URL, package size, and SHA-256 value together.</p>
                </article>
              </div>

              <div className="release-operations">
                <article className="release-operations__card">
                  <FileArchive size={21} /><h3>Distribution brief</h3><p>Share the verified ZIP when recipients need the source package. Share a separately verified <code>.exe</code> only after it has passed the clean-machine check.</p>
                </article>
                <article className="release-operations__card">
                  <TerminalSquare size={21} /><h3>Support record</h3><p>For a build issue, capture the Windows version, Python version, exact command, full terminal output, and whether the failure occurs before or after packaging.</p>
                </article>
                <article className="release-operations__card release-operations__card--alert">
                  <ShieldAlert size={21} /><h3>Known limitations</h3><p>This release page distributes a source ZIP, not a pre-built native executable. External integrations and runtime behavior require their own configuration and validation.</p>
                </article>
              </div>
            </section>

            <section className="section-block" id="method-windows">
              <div className="section-heading">
                <div><span className="section-kicker">01 / recommended</span><h2>Build on Windows</h2></div>
                <p>This route produces the native Windows executable described in the package documentation.</p>
              </div>

              <div className="prereq-grid">
                <div className="prereq-card"><MonitorCog size={21} /><div><b>Windows host</b><span>Windows 10 or 11</span></div></div>
                <div className="prereq-card"><Code2 size={21} /><div><b>Python on PATH</b><span>Python 3.8 or newer</span></div></div>
                <div className="prereq-card"><HardDriveDownload size={21} /><div><b>Internet access</b><span>For required packages</span></div></div>
              </div>

              <div className="steps-grid">
                <Step number="01" title="Extract the package">
                  <p>Place the full project in a writable folder, such as <code>C:\AI_Operating_System\</code>. Keep <code>ai_os.spec</code>, the launcher, and the application folder together.</p>
                </Step>
                <Step number="02" title="Install PyInstaller">
                  <p>Open Command Prompt in the extracted project folder, then install the packaging tool.</p>
                  <CommandSlip command={windowsInstall} />
                </Step>
                <Step number="03" title="Run the configured build">
                  <p>Use the included batch script, or run the specification file directly. Do not pass a <code>.bat</code> file to PyInstaller.</p>
                  <div className="command-pair">
                    <CommandSlip command="build_executable.bat" />
                    <span className="or-divider">or</span>
                    <CommandSlip command={windowsBuild} />
                  </div>
                </Step>
                <Step number="04" title="Locate the artifact">
                  <p>After a successful build, find the executable in the <code>dist</code> directory.</p>
                  <div className="output-path"><FileCode2 size={20} /><code>dist\AI_Operating_System.exe</code></div>
                </Step>
              </div>
            </section>

            <section className="proof-panel">
              <div className="proof-panel__copy">
                <span className="section-kicker">Before you distribute</span>
                <h2>“Built” is not the same as “ready.”</h2>
                <p>A packaged executable is only ready to share after it starts on a clean Windows machine without the source project or a local Python installation.</p>
                <a className="inline-link" href="#verification">Read the validation checklist <ArrowRight size={15} /></a>
              </div>
              <img src={assets.blueprint} alt="Abstract visual of an application becoming an executable artifact" />
            </section>

            <section className="section-block" id="alternatives">
              <div className="section-heading">
                <div><span className="section-kicker">02 / alternatives</span><h2>Choose the right environment</h2></div>
                <p>Use these paths only when they match the target environment. They are not substitutes for a native Windows build.</p>
              </div>

              <div className="alternative-grid">
                <article className="alternative-card alternative-card--dark">
                  <div className="alternative-card__icon"><Laptop size={22} /></div>
                  <span className="card-label">Method 02</span>
                  <h3>Build inside WSL</h3>
                  <p>Useful for a Linux executable that will run under WSL. This does <strong>not</strong> create a native Windows <code>.exe</code>.</p>
                  <CommandSlip language="BASH" command="wsl --install" />
                  <CommandSlip language="BASH" command={wslInstall} />
                  <CommandSlip language="BASH" command={wslBuild} />
                </article>
                <article className="alternative-card">
                  <div className="alternative-card__icon"><PackageCheck size={22} /></div>
                  <span className="card-label">Portable fallback</span>
                  <h3>Run from a Python package</h3>
                  <p>If a packaged executable is not practical, use the fixed scripts with a local Python installation or distribute with a portable Python runtime.</p>
                  <ul className="check-list">
                    <li><CheckCircle2 size={16} /> <code>setup_fixed.bat</code> installs dependencies.</li>
                    <li><CheckCircle2 size={16} /> <code>quick_start_fixed.bat</code> starts the system.</li>
                    <li><CheckCircle2 size={16} /> Portable options: WinPython, Anaconda, or Python Embeddable.</li>
                  </ul>
                </article>
              </div>

              <button className="advanced-toggle" type="button" onClick={() => setAdvancedOpen((value) => !value)} aria-expanded={advancedOpen}>
                <span><Command size={17} /> Advanced paths: cross-compilation</span><ChevronDown size={18} className={advancedOpen ? "rotate" : ""} />
              </button>
              {advancedOpen ? (
                <div className="advanced-panel">
                  <p>Advanced workflows may use Wine with PyInstaller on Linux, Docker with Windows containers, or a CI runner that has a Windows build environment. These require independent configuration and testing; prefer the native Windows route for the most direct result.</p>
                </div>
              ) : null}
            </section>

            <section className="section-block section-block--troubleshooting" id="troubleshooting">
              <div className="section-heading">
                <div><span className="section-kicker">03 / troubleshoot</span><h2>Fix the build, not the symptom</h2></div>
                <p>Start with the direct cause shown in the command output. These are common packaging blockers.</p>
              </div>
              <div className="troubleshoot-layout">
                <div className="troubleshoot-list">
                  <TroubleItem title="PyInstaller is not recognized" detail="Install it into the same Python environment you use for the build command." command={windowsInstall} />
                  <TroubleItem title="A module is missing during analysis" detail="Install the project's declared dependencies before rebuilding." command={requirements} />
                  <TroubleItem title="Permission is denied" detail="Use a writable project folder. If Windows security blocks the action, review the warning and your local antivirus policy before proceeding." />
                  <TroubleItem title="The output is larger than expected" detail="The executable can include the Python runtime and dependencies. Reduce size only after verifying the complete build works." />
                </div>
                <figure className="troubleshoot-figure"><img src={assets.troubleshoot} alt="Abstract build troubleshooting card with diagnostic indicators" /><figcaption>Resolve the first concrete failure before changing the packaging strategy.</figcaption></figure>
              </div>
              <div className="optimization-box">
                <div><span className="section-kicker">Optional size tuning</span><h3>Optimize after a clean validation pass</h3></div>
                <CommandSlip command={optimization} />
                <p>You can also exclude modules only when you know the application does not use them, for example <code>tkinter</code>, <code>matplotlib</code>, or <code>numpy</code>.</p>
              </div>
            </section>

            <section className="section-block verification" id="verification">
              <div className="section-heading">
                <div><span className="section-kicker">04 / validation</span><h2>Verify, then hand off</h2></div>
                <p>Confirm the expected environment is clean before treating the executable as portable.</p>
              </div>
              <div className="verification-card">
                <div className="verification-card__top"><ShieldAlert size={25} /><div><h3>Clean-machine check</h3><p>Run this sequence before distributing the artifact.</p></div></div>
                <ol className="validation-list">
                  <li><span>1</span> Copy only the built <code>.exe</code> to a separate Windows machine or clean test environment.</li>
                  <li><span>2</span> Confirm Python is not required for the launch path you plan to distribute.</li>
                  <li><span>3</span> Start the executable and confirm the expected web interface opens.</li>
                  <li><span>4</span> Exercise the features you intend to support before sending the file to someone else.</li>
                </ol>
                <div className="verification-card__footer"><CheckCircle2 size={19} /><span>Share the artifact only after each check passes.</span></div>
              </div>
            </section>

            <section className="handoff-panel">
              <div><span className="section-kicker">Distribution handoff</span><h2>Keep the release small and clear.</h2><p>For a single-file distribution, share the verified executable. For a full package, include the documentation, example configuration, and an uninstaller if applicable.</p></div>
              <div className="handoff-panel__actions"><a className="button button--ink" href="#method-windows">Review the build steps <ArrowRight size={17} /></a><a className="inline-link" href="#overview">Back to overview <ArrowDownRight size={15} /></a></div>
            </section>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="brand"><img src={assets.mark} alt="" /><span>AI OS <i>Build Guide</i></span></div>
        <p>A practical interpretation of the supplied Windows executable build instructions.</p>
        <a href="#overview">Top <ArrowDownRight size={14} /></a>
      </footer>
    </div>
  );
}
