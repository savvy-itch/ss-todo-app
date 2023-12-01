import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full flex justify-center sm:justify-end items-center gap-4 p-5 mt-10">
      <p>Developed by Mykhailo "savvy itch" Savych</p>
      <a 
        href="https://github.com/savvy-itch/ss-todo-app" 
        className="text-xl hover:text-neutral-700 transition-colors"
        target="_blank" 
        rel="noopener noreferrer"
      >
        <Github className="h-8 w-8" />
      </a>
    </footer>
  )
}
