import React from 'react'
import { TestimonialData } from '../Constants'
const Testimonials = () => {
  return (
   <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
         {TestimonialData.map((data,index)=>(
           
                 <div className="bg-gray-50 p-6 rounded-lg">

              <div key={index} className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src={data.image} alt="Sarah Johnson" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">{data.name}</h4>
                  <p className="text-gray-500">{data.role}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 italic">
                    {data.testimonial}                </p>
              </div>
            </div>
))}
            </div>
  )
}

export default Testimonials
