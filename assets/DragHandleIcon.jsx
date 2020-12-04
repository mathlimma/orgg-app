import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function DragHandleIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9.98 8.986a.982.982 0 100-1.964.982.982 0 000 1.964zM9.98 16.845a.982.982 0 100-1.965.982.982 0 000 1.964zM13.91 8.986a.982.982 0 100-1.965.982.982 0 000 1.965zM13.91 16.845a.982.982 0 100-1.965.982.982 0 000 1.964zM13.91 12.915a.982.982 0 100-1.964.982.982 0 000 1.964zM9.98 12.915a.982.982 0 100-1.964.982.982 0 000 1.964z"
        fill="#000"
      />
    </Svg>
  );
}

export default DragHandleIcon;
