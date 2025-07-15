import React from 'react'
import { workingSteps } from '../Constants'
const Working = () => {
  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Simple steps to submit your reports efficiently
            </p>
          </div>
        
            <div className="mt-16 ">
            <div className="lg:grid lg:grid-cols-3  lg:gap-8">
                  {workingSteps.map((data,index)=>(
              <div key={index} className="relative  flex flex-col justify-center items-center pb-5 pl-5 pr-5  bg-gray-300">
                <div className="flex  justify-center items-center  h-12 w-12 rounded-md bg-[#2563eb] text-white">
                  <span className="text-lg font-bold">{data.step}</span>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">{data.title}</h3>
                <p className="mt-2 text-base text-gray-500">
                      {data.description}                </p>
              </div>
          ))}
            </div>
          </div>
        </div>
      </section>
  )
}

export default Working
