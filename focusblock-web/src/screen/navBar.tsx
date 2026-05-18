import { Button } from "../component/ui/button"

const navigationItems = [
  {label: "Dashboard", active: false},
  {label: "Tasks", active: false},
  {label: "Calendar", active: false}
]

export default function navBar({ title }: { title: string }) {
  return (
    <header className="w-full border-b border-black/5 bg-[#f5efe8] shadow-[0px_2px_10px_#00000012]">
      <div className="flex h-[68px] w-full items-center justify-between px-12">
        <div className="[font-family: 'Inter',Helvetica] text-[22px] font-bold leading-[normal] tracking-[0] text-[#c2c9b8]">
          {title}
        </div>
        <nav aria-label="Primary" className="flex items-center">
          <ul className="flex items-center gap-10">
            {navigationItems.map((item) => (
              <li 
                key={item.label} 
                className="relative flex h-[68px] items-center"
              >
                <Button 
                  type="button" 
                  variant="ghost" 
                  className={`h-auto rounded-none px-0 py-0 [font-family:'Inter',Helvetica] text-sm font-normal leading-[normal] tracking-[0] hover:bg-transparent 
                    ${item.active ? "text-[#8d9c84] hover:text-[#8d9c84]" : "text-[#797570] hover:text-[#797570]"}`} aria-current={item.active ? "page" : undefined}
                >
                  <span className="relative inline-flex item-center">
                    {item.label}
                    {item.active ? (<span className="absolute left-1/2 top-[37px] h-0.5 w-12 -translate-x-1/2 rounded-[1px] bg-[#8d9c84]" />)  : null}
                  </span>
                </Button>
              </li>
              ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <button type="button" aria-label="Notifications" className="h-8 w-8 rounded-full bg-[#d1cec773]" />
          <button type="button" aria-label="User profile" className="h-[38px] w-[38px] rounded-full bg-[#c2c9b8]" />
        </div>
      </div>
    </header>
  );
}