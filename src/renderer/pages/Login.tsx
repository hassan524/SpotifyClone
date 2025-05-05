import React from 'react';
import bg from '../../../resources/bg.png';

const Login = () => {

  const handleLogin = () => {
    window.electronAPI.loginWithSpotify(); 
  };

  return (
    <div className="background-container relative w-screen h-screen flex justify-center items-center">
      <div
        className="background absolute inset-0"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      <div className="overlay absolute inset-0"></div>

      <div className="w-[40rem] h-[30rem] relative z-10 bg-[#121212] rounded-xl flex flex-col gap-[2rem] items-center justify-center text-white">
        <div className="flex gap-3 text-5xl">
          <i className="bi bi-spotify"></i>
          <span>Spotify</span>
        </div>
        <div className="fkex flex-col gap-3 text-4xl text-center font-bold">
          <p>Millions of songs.</p>
          <p>Free on Spotify.</p>
        </div>
        <div className="">
          <button onClick={handleLogin} className='bg-[#1ED760] text-[#121212] text-2xl cursor-pointer hover:scale-[1.05] hover:bg-[#87ffb1] transition ease-in-out w-48 rounded-4xl h-16 flex items-center justify-center gap-3'>
            <span className='' style={{ fontWeight: 800 }}>Log in</span>
            <i className="bi bi-box-arrow-up-right bold-icon"></i>
          </button>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-2xl">
            <p className='text-gray-400'>New on Spotify?</p>
            <span>Sign up for free  <i className="bi bi-box-arrow-up-right bold-icon ps-2"></i></span>
          </div>
          <span className='text-2xl blur-[0.7px]'>Setting</span>
        </div>

      </div>
    </div>
  );
};

export default Login;
