import './loading.css';

export default function Loading() {
  return (
    <div className="h-32 mx-auto flex justify-center items-center">
      <div className="loader text-neutral-800 bg-neutral-800 relative text-[11px] w-[1em]" />
    </div>
  )
}
