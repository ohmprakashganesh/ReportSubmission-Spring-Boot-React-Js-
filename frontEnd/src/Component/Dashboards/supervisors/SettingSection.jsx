export const SettingsSection = ({user}) => {
     

    return (
       <div className="max-w-md flex mt-[13%] justify-center  items-center mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-lg m-4">
      <div className="md:flex ">
        <div className="md:shrink-0 p-6 flex justify-center items-center">
            <img 
              className="h-44 w-44 object-cover rounded-full border-4 border-blue-500" 
              src="https://i.pravatar.cc/40" 
              alt={`Profile of ${name}`} 
            />
     
        </div>
        <div className="p-8 w-full text-center md:text-left">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{user.name}</div>
                    <div className="mt-4 pt-4 border-t border-gray-200 text-left">
     
              <div className="flex items-center mt-2">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                <a  className="text-blue-600 hover:underline">{user.email}</a>
              </div>
       
       
              <div className="flex items-center mt-2">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.163 18 3 13.837 3 8V6a1 1 0 011-1h2z"></path></svg>
                <a  className="text-gray-700">{user.role}</a>
              </div>
          </div>
        </div>
      </div>
    </div>
    );
};
export default SettingsSection;
