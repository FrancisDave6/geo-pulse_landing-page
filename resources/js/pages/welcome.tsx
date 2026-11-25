import { Head } from '@inertiajs/react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Download, Droplets, FileText, FlaskConical, FolderOpen, Menu, Radio, Sprout, Video, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const navItems = [
    { label: 'Platform', href: '#platform' },
    { label: 'Crop guidance', href: '#insights' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Project journey', href: '#project-journey' },
    { label: 'About', href: '#platform' },
];

type Reading = {
    key: string;
    label: string;
    short: string;
    value: number;
    unit: string;
    color: string;
    status: string;
    max: number;
    low: number;
    high: number;
};

const readings: Reading[] = [
    { key: 'nitrogen', label: 'Nitrogen', short: 'N', value: 42, unit: 'mg/kg', color: '#8edb75', status: 'In range', max: 60, low: 30, high: 50 },
    { key: 'phosphorus', label: 'Phosphorus', short: 'P', value: 18, unit: 'mg/kg', color: '#e5c46c', status: 'A little low', max: 60, low: 20, high: 40 },
    { key: 'potassium', label: 'Potassium', short: 'K', value: 31, unit: 'mg/kg', color: '#89bdf0', status: 'In range', max: 60, low: 25, high: 45 },
];

const cropData: Record<string, { crop: string; match: number; note: string; fertilizer: string; swatch: string; texture: string }> = {
    Loam: { crop: 'Maize', match: 94, note: 'Excellent balance of drainage and nutrient retention.', fertilizer: 'Compost + phosphorus blend', swatch: '#6b4a30', texture: 'Crumbly and balanced' },
    Clay: { crop: 'Rice', match: 89, note: 'Strong water retention suits paddy cultivation.', fertilizer: 'Balanced NPK 10-10-10', swatch: '#a4674a', texture: 'Dense and water-holding' },
    Sandy: { crop: 'Groundnut', match: 86, note: 'Thrives in light soil with steady, smaller irrigation.', fertilizer: 'Organic matter + potash', swatch: '#d4b682', texture: 'Light and fast-draining' },
    Silt: { crop: 'Wheat', match: 91, note: 'Naturally fertile soil supports a strong grain cycle.', fertilizer: 'Nitrogen-rich compost', swatch: '#9b8a70', texture: 'Smooth and fertile' },
};

const steps = [
    { depth: 'Surface', icon: Radio, title: 'Sense the soil', text: 'Connected field sensors capture moisture and key nutrient readings right where crops grow.' },
    { depth: 'Root zone', icon: FlaskConical, title: 'Understand the profile', text: 'NPK, pH and soil type come together so you can see the conditions shaping your field.' },
    { depth: 'Next season', icon: Sprout, title: 'Plan with context', text: 'Explore crop matches and nutrient actions informed by your soil’s current profile.' },
];

const projectDocuments = [
    { title: 'Customer Validation Report', description: 'Customer interviews and validation findings', href: '/documentation/5_Customer_Validation_Report-1.pdf', type: 'PDF' },
    { title: 'Competitive Advantage', description: 'Assignment 7 · Competitive advantage', href: '/documentation/Assignment_7_Competitive_Advantage-1.pdf', type: 'PDF' },
    { title: 'Ideation Session', description: 'Project ideation and concept development', href: '/documentation/Ideation-Session.docx.pdf', type: 'PDF' },
    { title: 'Soil Sense Persona', description: 'Research persona for the target user', href: '/documentation/Soil_sense_persona.pdf', type: 'PDF' },
    { title: 'Geo-Pulse project video 1', description: 'Watch the project video on Google Drive', href: 'https://drive.google.com/file/d/1reVDa-XPEm3waW0PazaQcRgChBgaRJGc/view', type: 'Video' },
    { title: 'Geo-Pulse project video 2', description: 'Watch the project video on Google Drive', href: 'https://drive.google.com/file/d/1Yn3BDTdp53NJ0GY3fSNCBXVcBDDraK8x/view', type: 'Video' },
];

// Small seeded generator so the soil particles are stable between renders.
function seeded(seed: number) {
    let a = seed;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function SoilCore({ active }: { active: string }) {
    const particles = useMemo(() => {
        const rand = seeded(7);
        return readings.flatMap((r) =>
            Array.from({ length: r.value }, (_, i) => ({
                id: `${r.key}-${i}`,
                key: r.key,
                color: r.color,
                x: 100 + rand() * 310,
                y: 70 + rand() * 220,
            })),
        );
    }, []);

    const rocks = useMemo(() => {
        const rand = seeded(21);
        return Array.from({ length: 9 }, (_, i) => ({ id: i, x: 110 + rand() * 300, y: 320 + rand() * 100, r: 6 + rand() * 11 }));
    }, []);

    return (
        <svg viewBox="0 0 440 460" className="h-auto w-full" role="img" aria-label="Cross-section of soil with a sensor probe. Each dot is a nutrient particle; more dots mean a higher reading.">
            <rect width="440" height="56" fill="#dbe7cc" />
            <rect y="56" width="440" height="120" fill="#4a3222" />
            <rect y="176" width="440" height="130" fill="#6b4a30" />
            <rect y="306" width="440" height="154" fill="#8d7050" />

            {/* grass + sprouts */}
            {Array.from({ length: 44 }, (_, i) => (
                <path key={i} d={`M${i * 10 + 4} 56 q${i % 2 ? 3 : -3} -${10 + (i % 5) * 3} ${i % 3}-${14 + (i % 4) * 3}`} stroke="#5f9a47" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            ))}
            <path d="M0 56 H440" stroke="#2e6b3a" strokeWidth="3" />

            {rocks.map((rock) => (
                <circle key={rock.id} cx={rock.x} cy={rock.y} r={rock.r} fill="#a98d6a" opacity=".55" />
            ))}

            {particles.map((p) => {
                const on = p.key === active;
                return (
                    <circle
                        key={p.id}
                        cx={p.x}
                        cy={p.y}
                        r="3.4"
                        fill={p.color}
                        className="origin-center transition-all duration-500 [transform-box:fill-box]"
                        style={{ opacity: on ? 1 : 0.22, transform: on ? 'scale(1.25)' : 'scale(0.7)' }}
                    />
                );
            })}

            {/* probe */}
            <rect x="58" y="14" width="22" height="30" rx="6" fill="#f4f5f0" />
            <circle cx="69" cy="29" r="4" fill="#8edb75" />
            <circle cx="69" cy="29" r="4" fill="#8edb75" className="motion-safe:animate-ping origin-center [transform-box:fill-box]" opacity=".6" />
            <rect x="65" y="44" width="8" height="360" rx="4" fill="#e7e3d6" />
            <path d="M65 404 L69 424 L73 404 Z" fill="#e7e3d6" />
            {[110, 230, 350].map((y, i) => (
                <g key={y}>
                    <rect x="62" y={y - 8} width="14" height="16" rx="3" fill="#18321d" />
                    <circle cx="69" cy={y} r="3" fill="#d4f07b" />
                    <text x="86" y={y + 4} fontSize="11" fill="#f4f5f0" opacity=".85">{['10 cm', '30 cm', '50 cm'][i]}</text>
                </g>
            ))}

            {[
                { y: 168, t: 'Topsoil' },
                { y: 298, t: 'Subsoil' },
                { y: 448, t: 'Parent material' },
            ].map((l) => (
                <text key={l.t} x="426" y={l.y} textAnchor="end" fontSize="12" fill="#f4f5f0" opacity=".8" stroke="#00000040" strokeWidth="3" paintOrder="stroke">
                    {l.t}
                </text>
            ))}
        </svg>
    );
}

export default function Welcome() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [ready, setReady] = useState(false);
    useEffect(() => setReady(true), []);
    const aboutEnter = (delay: string) => `transition duration-700 ease-out motion-reduce:transition-none ${delay} ${ready ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`;
    const [soil, setSoil] = useState('Loam');
    const [activeReading, setActiveReading] = useState('nitrogen');
    const recommendation = cropData[soil];
    const ringC = 2 * Math.PI * 56;

    return (
        <>
            <Head title="Geo-Pulse | Grow with the ground" />
            <style>{`
                .gp-body a:focus-visible, .gp-body button:focus-visible { outline: 2px solid #9fd356; outline-offset: 3px; border-radius: 12px; }
                .gp-body { scrollbar-width: thin; scrollbar-color: #668b4d #e4e9d8; }
                .gp-body::-webkit-scrollbar { width: 10px; }
                .gp-body::-webkit-scrollbar-track { background: #e4e9d8; }
                .gp-body::-webkit-scrollbar-thumb { background: #668b4d; border: 2px solid #e4e9d8; border-radius: 999px; }
                .gp-body::-webkit-scrollbar-thumb:hover { background: #3f6b3a; }
                @keyframes gp-rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
                @media (prefers-reduced-motion: no-preference) {
                    .gp-hero > * { animation: gp-rise .9s cubic-bezier(.2,.7,.2,1) both; }
                    .gp-hero > *:nth-child(2) { animation-delay: .12s; }
                    .gp-hero > *:nth-child(3) { animation-delay: .24s; }
                    .gp-hero > *:nth-child(4) { animation-delay: .36s; }
                }
            `}</style>

            <main className="gp-body min-h-screen font-sans overflow-x-hidden bg-[#f4f5f0] text-[#1f160f]">
                {/* HERO */}
                <section id="top" className="relative isolate flex min-h-[780px] flex-col overflow-hidden bg-[#142b1d] text-white lg:min-h-[100svh]">
                    <img className="absolute inset-0 -z-20 h-full w-full object-cover object-center" src="/images/hero-section.png" alt="Geo-Pulse soil sensor monitoring crops at sunset" />
                    <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(20,14,8,.55)_0%,rgba(20,14,8,0)_26%),linear-gradient(0deg,rgba(14,22,12,.92)_0%,rgba(14,22,12,.5)_34%,rgba(14,22,12,0)_62%)]" />

                    <header className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 pt-5 md:px-10 lg:px-14">
                        <a href="#top" className="flex items-center gap-3.5" aria-label="Geo-Pulse home">
                            <img src="/images/logo.png" alt="" className="h-[4.5rem] w-[4.5rem] rounded-full object-contain drop-shadow-md md:h-20 md:w-20" fetchPriority="high" />
                            <span className="text-[1.65rem] font-bold leading-none tracking-[-.055em] text-white drop-shadow-md md:text-[2rem]">Geo<span className="text-[#d4f07b]">-Pulse</span></span>
                        </a>

                        <nav className="hidden items-center gap-2 md:flex" aria-label="Main navigation">
                            {navItems.map((item) => (
                                <a key={item.label} href={item.href} className="rounded-full px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/15 hover:text-white">{item.label}</a>
                            ))}
                        </nav>

                        <div className="hidden items-center gap-3 md:flex">
                            <a href="#platform" className="inline-flex items-center gap-2 rounded-full bg-[#d4f07b] px-5 py-3 text-sm font-semibold text-[#18321d] transition hover:bg-[#e6f8a8]">Explore platform <ArrowUpRight size={16} /></a>
                        </div>

                        <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-black/20 backdrop-blur md:hidden" aria-label="Toggle menu" aria-expanded={menuOpen}>
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </header>

                    {menuOpen && (
                        <nav className="relative z-20 mx-5 mt-3 flex flex-col gap-1 rounded-3xl border border-white/25 bg-white/10 p-3 text-white shadow-lg backdrop-blur-xl md:hidden">
                            {navItems.map((item) => (
                                <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-2xl px-4 py-3 text-base hover:bg-white/10">{item.label}</a>
                            ))}
                            <a href="#platform" onClick={() => setMenuOpen(false)} className="mt-1 rounded-2xl bg-[#d4f07b] px-4 py-3 text-center text-base font-semibold text-[#18321d]">Explore platform</a>
                        </nav>
                    )}

                    <div className="relative z-10 mx-auto mt-auto w-full max-w-[1440px] px-5 pb-14 pt-24 md:px-10 lg:px-14 lg:pb-[4.5rem]">
                        <div className="gp-hero -translate-y-8 md:-translate-y-12">
                            <h1 className="max-w-[980px] text-[clamp(3.6rem,10vw,9rem)] font-medium leading-[.88] tracking-[-.06em]">Grow with<br />the <span className="font-serif font-normal italic text-[#d4f07b]">ground.</span></h1>
                            <p className="mt-7 max-w-[520px] text-lg leading-8 text-white/85">A clearer picture of your soil, and smarter decisions every season. Geo-Pulse turns live field readings into practical growing guidance.</p>
                            <div className="mt-9 flex flex-wrap items-center gap-3">
                                <a href="#platform" className="inline-flex items-center gap-3 rounded-full bg-[#d4f07b] px-7 py-4 text-base font-semibold text-[#18321d] transition hover:bg-[#e6f8a8]">Explore your soil <ArrowRight size={18} /></a>
                                <a href="#how-it-works" className="inline-flex items-center gap-3 rounded-full px-5 py-4 text-base font-medium text-white transition hover:bg-white/10">
                                    <span className="grid h-8 w-8 place-items-center rounded-full border border-white/60"><ArrowDown size={15} /></span>See how it works
                                </a>
                            </div>
                        </div>

                        <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/20 bg-white/15 text-sm backdrop-blur-md sm:grid-cols-3">
                            {[
                                ['Live soil signals', 'Moisture and nutrients, as they change'],
                                ['N · P · K insights', 'See what each nutrient is doing'],
                                ['Field-ready guidance', 'Crop matches for your soil type'],
                            ].map(([t, d]) => (
                                <div key={t} className="bg-[#0e1a10]/55 px-5 py-4">
                                    <dt className="text-lg font-bold tracking-tight">{t}</dt>
                                    <dd className="mt-0.5 text-white/65">{d}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* ABOUT */}
                <section id="platform" className="bg-[#f4f5f0] px-5 py-16 text-[#1f160f] md:px-10 md:py-24 lg:px-14 lg:py-28">
                    <div className="mx-auto grid max-w-[1360px] items-stretch gap-10 lg:min-h-[640px] lg:grid-cols-[.85fr_1.15fr] lg:gap-16 xl:gap-20">
                        <aside className={`relative isolate min-h-[400px] overflow-hidden rounded-[32px] bg-[#17301f] text-white shadow-[0_30px_80px_rgba(23,48,31,.18)] md:min-h-[520px] lg:min-h-full ${aboutEnter('delay-0')}`}>
                            <img src="/images/about.png" alt="A soil sensor collecting readings among growing crops" className="absolute inset-0 -z-20 h-full w-full object-cover object-[44%_center]" />
                            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#102719]/85 via-[#102719]/20 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-7 md:p-10 lg:p-12">
                                <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#d4f07b]">About us</p>
                                <p className="mt-3 max-w-[340px] text-3xl font-medium leading-tight tracking-[-.04em] md:text-4xl">Better insight starts beneath your feet.</p>
                            </div>
                        </aside>

                        <div className="flex items-center py-4 lg:py-10">
                            <div className="w-full max-w-[760px]">
                                <p className={`text-sm font-semibold uppercase tracking-[.22em] text-[#668b4d] ${aboutEnter('delay-100')}`}>A clearer picture of your field</p>
                                <h2 className={`mt-4 max-w-[760px] text-[clamp(2.8rem,6vw,6rem)] font-medium leading-[.94] tracking-[-.065em] ${aboutEnter('delay-200')}`}>Grow with a better understanding of your <span className="font-serif font-normal italic text-[#668b4d]">ground.</span></h2>
                                <p className={`mt-7 max-w-[680px] text-lg leading-8 text-[#5b564c] md:text-xl md:leading-9 ${aboutEnter('delay-300')}`}>Geo-Pulse brings connected soil sensing and crop guidance together to help growers understand what is happening below the surface. By making moisture, nutrients and soil conditions easier to read, we turn field data into useful context for everyday decisions.</p>

                                <div className="mt-10 grid gap-3 border-t border-[#dcdcd0] pt-6 sm:grid-cols-3 sm:gap-4">
                                    <article className={`rounded-2xl bg-white/70 p-4 ${aboutEnter('delay-300')}`}><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e4e9d8] text-[#3f6b3a]"><Droplets size={20} /></span><h3 className="mt-4 text-base font-semibold tracking-tight">Understand your soil</h3><p className="mt-2 text-sm leading-6 text-[#6c675b]">Read moisture and nutrient signals across the root zone.</p></article>
                                    <article className={`rounded-2xl bg-white/70 p-4 ${aboutEnter('delay-300')}`}><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e4e9d8] text-[#3f6b3a]"><FlaskConical size={20} /></span><h3 className="mt-4 text-base font-semibold tracking-tight">Find useful context</h3><p className="mt-2 text-sm leading-6 text-[#6c675b]">Turn sensor readings into a clearer view of field conditions.</p></article>
                                    <article className={`rounded-2xl bg-white/70 p-4 ${aboutEnter('delay-300')}`}><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e4e9d8] text-[#3f6b3a]"><Sprout size={20} /></span><h3 className="mt-4 text-base font-semibold tracking-tight">Plan with confidence</h3><p className="mt-2 text-sm leading-6 text-[#6c675b]">Explore crop matches and actions for your next season.</p></article>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* INSIGHTS */}
                <section id="insights" className="bg-[#e4e9d8] px-5 py-24 md:px-10 md:py-28 lg:px-14">
                    <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
                        <div>
                            <h2 className="text-[clamp(2.6rem,5vw,4.3rem)] font-medium leading-[.98] tracking-[-.06em]">A better fit<br />for <span className="font-serif font-normal italic text-[#668b4d]">your soil.</span></h2>
                            <p className="mt-6 max-w-[440px] text-lg leading-8 text-[#55584a]">Compare soil profiles, explore crop suitability and see where nutrient levels may need attention.</p>

                            <p id="soil-label" className="mt-9 text-sm font-semibold text-[#3c4034]">Choose your soil type</p>
                            <div role="group" aria-labelledby="soil-label" className="mt-3 grid grid-cols-2 gap-3">
                                {Object.entries(cropData).map(([type, d]) => {
                                    const on = soil === type;
                                    return (
                                        <button
                                            key={type}
                                            onClick={() => setSoil(type)}
                                            aria-pressed={on}
                                            className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition ${on ? 'border-[#1f3d29] bg-white' : 'border-transparent bg-white/55 hover:bg-white/80'}`}
                                        >
                                            <span className="h-11 w-11 shrink-0 rounded-xl" style={{ backgroundColor: d.swatch }} />
                                            <span>
                                                <span className="block text-base font-semibold">{type}</span>
                                                <span className="block text-xs leading-4 text-[#6c6f60]">{d.texture}</span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="rounded-[32px] bg-[#17301f] p-6 text-white shadow-[0_30px_80px_rgba(23,48,31,.3)] md:p-10" aria-live="polite">
                            <p className="text-sm text-white/60">Best crop for {soil.toLowerCase()} soil</p>
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-6">
                                <h3 className="text-[clamp(3rem,6vw,5rem)] font-bold leading-none tracking-[-.04em]">{recommendation.crop}</h3>
                                <div className="relative h-[132px] w-[132px]">
                                    <svg viewBox="0 0 132 132" className="h-full w-full -rotate-90">
                                        <circle cx="66" cy="66" r="56" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="10" />
                                        <circle cx="66" cy="66" r="56" fill="none" stroke="#d4f07b" strokeWidth="10" strokeLinecap="round" strokeDasharray={ringC} strokeDashoffset={ringC * (1 - recommendation.match / 100)} className="transition-all duration-700" />
                                    </svg>
                                    <div className="absolute inset-0 grid place-items-center text-center">
                                        <div>
                                            <p className="text-3xl font-bold leading-none text-[#d4f07b]">{recommendation.match}%</p>
                                            <p className="mt-1 text-xs text-white/60">match</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-6 max-w-[460px] text-base leading-7 text-white/80">{recommendation.note}</p>
                            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-white/15 bg-white/[.06] p-5">
                                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#d4f07b] text-[#17351e]"><Check size={15} strokeWidth={3} /></span>
                                <div>
                                    <p className="text-sm text-white/60">Nutrient action to explore</p>
                                    <p className="mt-0.5 text-lg font-semibold">{recommendation.fertilizer}</p>
                                </div>
                            </div>
                            <p className="mt-6 text-xs leading-5 text-white/50">Illustrative guidance only. Check crop and fertilizer choices against local conditions, soil tests and qualified agronomic advice.</p>
                        </div>
                    </div>
                </section>

                {/* PROJECT JOURNEY */}
                <section id="project-journey" className="bg-[#e4e9d8] px-5 pb-8 pt-24 md:px-10 md:pt-32 lg:px-14">
                    <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-20">
                        <div>
                            <p className="flex items-center gap-3 text-sm font-medium text-[#547a42]"><span className="h-px w-8 bg-[#547a42]" />From listening to building</p>
                            <h2 className="mt-5 text-[clamp(3rem,6.4vw,6rem)] font-medium leading-[.95] tracking-[-.06em]">The Geo-Pulse<br /><span className="font-serif font-normal italic text-[#668b4d]">journey.</span></h2>
                        </div>
                        <div>
                            <p className="text-lg leading-8 text-[#55584a]">The platform began by listening to farmers, learning from what we saw in the field, and turning those needs into practical digital tools.</p>

                        </div>
                    </div>

                </section>

                {[
                    { id: 'journey-listen', image: '/images/journey-farmer.jpg', alt: 'The project team meeting and learning from a traditional farmer', number: '01', label: 'Listen and learn', titleStart: 'Start with', titleAccent: 'farmers.', text: 'We gathered first-hand insight through conversations and collaboration with traditional farmers, learning about their methods, experience and day-to-day decisions.', next: { href: '#journey-problem', label: 'Identify real field problems' }, section: 'bg-[#e4e9d8]', heading: 'text-[#1f160f]', body: 'text-[#55584a]', accent: 'text-[#668b4d]', numberColor: 'text-[#668b4d]/35', button: 'bg-[#17301f] text-white hover:bg-[#1f3d29]' },
                    { id: 'journey-problem', image: '/images/journey-problem.jpg', alt: 'The project team observing a waterlogged agricultural growing area', number: '02', label: 'Understand the challenge', titleStart: 'Identify real', titleAccent: 'field problems.', text: 'Field observation helped us focus on practical agricultural challenges, including limited access to timely soil insight and guidance for people without formal agricultural knowledge.', next: { href: '#journey-build', label: 'Build Geo-Pulse' }, section: 'bg-[#f4f5f0]', heading: 'text-[#1f160f]', body: 'text-[#5b564c]', accent: 'text-[#668b4d]', numberColor: 'text-[#668b4d]/35', button: 'bg-[#17301f] text-white hover:bg-[#1f3d29]' },
                    { id: 'journey-build', image: '/images/finish-product.png', alt: 'The finished Geo-Pulse platform for soil monitoring and crop guidance', number: '03', label: 'Design a response', titleStart: 'Build', titleAccent: 'Geo-Pulse.', text: 'Geo-Pulse brings sensor readings and crop guidance into one intelligent platform, helping farmers interpret soil conditions and make more informed growing decisions.', next: { href: '#project-archive', label: 'Project documents' }, section: 'bg-[#17301f]', heading: 'text-white', body: 'text-white/75', accent: 'text-[#d4f07b]', numberColor: 'text-[#d4f07b]/30', button: 'bg-[#d4f07b] text-[#18321d] hover:bg-[#e6f8a8]' },
                ].map((stage, index) => {
                    const flip = index % 2 === 1;
                    return (
                        <section key={stage.id} id={stage.id} className={`${stage.section} px-5 py-20 md:px-10 md:py-28 lg:px-14`}>
                            <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-2 lg:gap-20">
                                <div className={`relative ${flip ? 'lg:order-2' : ''}`}>
                                    <div className="group relative aspect-[4/3] overflow-hidden rounded-[32px] bg-[#17301f] shadow-[0_30px_80px_rgba(23,48,31,.25)] lg:aspect-[4/4.4]">
                                        <img src={stage.image} alt={stage.alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04] motion-reduce:transition-none" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#102719]/55 via-transparent to-transparent" />
                                        <p className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-4 py-2 text-sm text-white backdrop-blur-md">Stage {index + 1} of 3</p>
                                    </div>
                                </div>
                                <div className={flip ? 'lg:order-1' : ''}>
                                    <p className={`font-serif text-[clamp(5rem,10vw,9rem)] italic leading-none ${stage.numberColor}`}>{stage.number}</p>
                                    <p className={`mt-2 flex items-center gap-3 text-sm font-medium ${stage.accent}`}><span className="h-px w-8 bg-current" />{stage.label}</p>
                                    <h3 className={`mt-5 text-[clamp(2.4rem,4.6vw,4.2rem)] font-medium leading-[.98] tracking-[-.06em] ${stage.heading}`}>{stage.titleStart} <span className={`font-serif font-normal italic ${stage.accent}`}>{stage.titleAccent}</span></h3>
                                    <p className={`mt-6 max-w-[520px] text-lg leading-8 ${stage.body}`}>{stage.text}</p>
                                    <a href={stage.next.href} className={`mt-9 inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-base font-semibold transition ${stage.button}`}>Next: {stage.next.label}<ArrowRight size={17} /></a>
                                </div>
                            </div>
                        </section>
                    );
                })}

                {/* PROJECT ARCHIVE */}
                <section id="project-archive" className="bg-[#f4f5f0] px-5 py-20 md:px-10 md:py-28 lg:px-14">
                    <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
                        <div>
                            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#17301f] text-[#d4f07b]"><FolderOpen size={24} /></span>
                            <h2 className="mt-6 text-[clamp(2.4rem,4.4vw,3.8rem)] font-medium leading-[.98] tracking-[-.06em]">Documents and <span className="font-serif font-normal italic text-[#668b4d]">project records.</span></h2>
                            <p className="mt-6 max-w-[420px] text-lg leading-8 text-[#5b564c]">Research, presentations, project documentation and videos, gathered in one place.</p>
                        </div>
                        {projectDocuments.length > 0 ? (
                            <ul className="divide-y divide-[#dcdcd0] border-y border-[#dcdcd0]">
                                {projectDocuments.map((document) => (
                                    <li key={document.href}>
                                        <a href={document.href} target="_blank" rel="noreferrer" className="group flex items-center gap-5 px-2 py-5 transition hover:bg-white sm:px-5">
                                            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e4e9d8] text-[#3f6b3a]">{document.type === 'Video' ? <Video size={22} /> : <FileText size={22} />}</span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block text-lg font-semibold tracking-[-.02em]">{document.title}</span>
                                                {document.description && <span className="mt-0.5 block text-sm text-[#6c675b]">{document.description}</span>}
                                            </span>
                                            <span className="hidden rounded-full border border-[#d3d6c8] px-3 py-1 text-xs font-medium text-[#6c675b] sm:block">{document.type ?? 'PDF'}</span>
                                            <Download size={20} className="shrink-0 text-[#3f6b3a] transition group-hover:translate-y-0.5" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="rounded-[28px] border-2 border-dashed border-[#c9d1bb] bg-white/50 px-6 py-14 text-center md:px-10">
                                <FileText size={28} className="mx-auto text-[#668b4d]" />
                                <p className="mt-4 text-xl font-semibold tracking-[-.02em]">No project resources added yet</p>
                                <p className="mx-auto mt-2 max-w-[400px] text-base leading-7 text-[#6c675b]">Add PDF files to <code className="rounded bg-[#e4e9d8] px-1.5 py-0.5 text-sm text-[#3c4034]">public/documents</code> and list them in the <code className="rounded bg-[#e4e9d8] px-1.5 py-0.5 text-sm text-[#3c4034]">projectDocuments</code> array to show download links here.</p>
                            </div>
                        )}
                    </div>
                </section>
                {/* HOW IT WORKS */}
                <section id="how-it-works" className="mx-auto max-w-[1280px] px-5 py-24 md:px-10 md:py-32 lg:px-14">
                    <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
                        <div>
                            <h2 className="text-[clamp(2.5rem,4.6vw,4rem)] font-medium leading-[.98] tracking-[-.06em]">From soil to <span className="font-serif font-normal italic text-[#668b4d]">next step.</span></h2>
                            <p className="mt-6 max-w-[380px] text-lg leading-8 text-[#5b564c]">Make each growing decision with a little more context and a lot more confidence.</p>
                        </div>

                        <ol className="relative">
                            <span className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-[#3f6b3a] via-[#8d7050] to-[#4a3222]" aria-hidden />
                            {steps.map((s, i) => (
                                <li key={s.title} className="relative flex gap-6 pb-12 last:pb-0 md:gap-8">
                                    <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-4 border-[#f4f5f0] bg-[#17301f] text-[#d4f07b]">
                                        <s.icon size={22} />
                                    </span>
                                    <div className="pt-1.5">
                                        <p className="text-sm font-medium text-[#8a7a5c]">Step {i + 1} · {s.depth}</p>
                                        <h3 className="mt-1 text-2xl font-bold tracking-tight">{s.title}</h3>
                                        <p className="mt-2 max-w-[480px] text-base leading-7 text-[#5b564c]">{s.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <footer className="bg-[#241a13] px-5 py-10 text-white md:px-10 lg:px-14">
                    <div className="mx-auto flex max-w-[1280px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <a href="#top" className="flex items-center gap-2.5">
                            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#d4f07b] text-[#17351e]"><Sprout size={19} /></span>
                            <span className="text-lg font-bold tracking-tight">geo-pulse</span>
                        </a>
                        <p className="text-sm text-white/60">Better soil insight. More thoughtful growing.</p>
                        <a href="#top" className="inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-[#d4f07b]">Back to top <ArrowUpRight size={15} /></a>
                    </div>
                </footer>
            </main>
        </>
    );
}
