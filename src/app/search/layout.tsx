export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return (
      <div className="flex w-full bg-gray-200 justify-end py-10">
        {children}
      </div>
    )
  }