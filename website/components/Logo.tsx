export default function Logo({ size = 28, text = true }: { size?: number; text?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img
        src="/icon-192.png"
        width={size}
        height={size}
        alt={text ? '' : 'rust-anything'}
        className="shrink-0 rounded-[22%]"
      />
      {text && <span className="font-display font-semibold tracking-tight text-fg">rust-anything</span>}
    </span>
  )
}
