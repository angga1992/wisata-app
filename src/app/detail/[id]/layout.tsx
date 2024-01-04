export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return (
      <div className="flex w-full bg-white h-full py-10 px-10">
        {children}
      </div>
    )
  }