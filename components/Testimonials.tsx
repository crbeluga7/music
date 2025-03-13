const testimonials = [
  {
    content:
      "This platform has transformed my musical journey. The lessons are engaging and the instructors are top-notch!",
    author: "Sarah Johnson",
    role: "Guitar Student",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    content:
      "I've tried many online music learning platforms, but this one stands out. The progress tracking feature keeps me motivated.",
    author: "Michael Chen",
    role: "Piano Enthusiast",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    content: "The community support is amazing. I've learned so much from fellow students and the expert instructors.",
    author: "Emily Rodriguez",
    role: "Vocal Student",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  return (
    <section className="py-12 bg-indigo-50 overflow-hidden md:py-20 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What Our Students Say
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
            Hear from our community of music learners and see how our platform has helped them achieve their goals.
          </p>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.author}
                    />
                    <div className="ml-4">
                      <div className="text-lg font-medium text-gray-900">{testimonial.author}</div>
                      <div className="text-indigo-600">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-500">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

