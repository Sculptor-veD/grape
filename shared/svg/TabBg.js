import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const pathX = '620';
const pathY = '935';
const pathA = '950';
const pathB = '986';
export const TabBg = ({color = '#FFFFFF', ...props}) => {
  return (
    <Svg width={width} height={60} viewBox={`0 0 1600  260`} {...props}>
      <Path
        d={`M30,60h${pathX}.3c17.2,0,31,14.4,30,31.6c-0.2,2.7-0.3,5.5-0.3,8.2c0,71.2,58.1,129.6,129.4,130c72.1,0.3,130.6-58,130.6-130c0-2.7-0.1-5.4-0.2-8.1C${pathY}.7,74.5,${pathA}.5,60,${pathB}.7,60H2062c16.6,0,30,13.4,30,30v94c0,42-34,76-76,76H76c-42,0-76-34-76-76V90C0,73.4,13.4,60,30,60z`}
        fill={color}
      />
    </Svg>
  );
};
/*renderBottomTabBar() {
let ditchControlPointDx = CIRCLE_RADIUS + SPACE;
let ditchControlPointDy = CIRCLE_RADIUS + SPACE / 2;
let startingPointX = WIDTH_DEVICE / 2;
let startingPointY = 2 * CIRCLE_RADIUS + SPACE;
const HEIGHT_TABBAR_MOD = HEIGHT_TABBAR - 2 * CIRCLE_RADIUS - SPACE
return (
<View style={styles.bottomTabBar} pointerEvents='box-none'>
{this.renderQuickButton()}
{this.renderTabs()}
<Svg width={WIDTH_DEVICE} height={HEIGHT_TABBAR}>
<Path
stroke={svgColor.tabColor}
fill={svgColor.tabColor}
d={`
M ${startingPointX},${startingPointY}
q -${ditchControlPointDx - DELTA},0 -${ditchControlPointDx},-${ditchControlPointDy}
t -${ditchControlPointDx},-${ditchControlPointDy}
L 0,0
v ${HEIGHT_TABBAR}
h ${WIDTH_DEVICE / 2}
v -${HEIGHT_TABBAR_MOD}
q ${ditchControlPointDx - DELTA},0 ${ditchControlPointDx},-${ditchControlPointDy}
t ${ditchControlPointDx},-${ditchControlPointDy}
L ${WIDTH_DEVICE},0
v ${HEIGHT_TABBAR}
h -${WIDTH_DEVICE / 2}
`}
/>
</Svg>
</View>
);
} */
