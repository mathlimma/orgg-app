import React from 'react';
import {
  Defs, LinearGradient, Path, Stop, Svg,
} from 'react-native-svg';

function LogoIcon() {
  return (
    <Svg width={31} height={31} viewBox="0 0 31 31" fill="none">
      <Path d="M15.434 30.054c8.075 0 14.62-6.545 14.62-14.62 0-8.074-6.545-14.62-14.62-14.62C7.36.814.814 7.36.814 15.434c0 8.075 6.546 14.62 14.62 14.62z" fill="url(#paint0_linear)" />
      <Path fillRule="evenodd" clipRule="evenodd" d="M16.157 18.766c.466-1.582.765-4.028.765-6.773 0-4.77-.902-8.636-2.015-8.636s-2.015 3.866-2.015 8.636c0 4.137.678 7.595 1.584 8.44.415.671 1.012 1.42 1.74 2.148 1.804 1.803 3.732 2.8 4.306 2.225.575-.574-.421-2.502-2.225-4.306-.725-.725-1.47-1.32-2.14-1.734z" fill="#fff" />
      <Defs>
        <LinearGradient id="paint0_linear" x1="15.434" y1=".814" x2="15.434" y2="30.054" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#EB5757" />
          <Stop offset="1" stopColor="#E891B7" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default LogoIcon;
