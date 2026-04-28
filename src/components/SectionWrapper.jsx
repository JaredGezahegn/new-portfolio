const SectionWrapper = ({ id, children, className = "" }) => {
  return (
    <section
      id={id}
      className={`min-h-screen py-fluid-xl px-4 xs:px-6 ${className}`}
    >
      <div className="container mx-auto max-w-7xl">
        {children}
      </div>
    </section>
  )
}

export default SectionWrapper
