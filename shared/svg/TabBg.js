import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const pathX = '620';
const pathY = '935';
const pathA = '950';
const pathB = '1200';
export const TabBg = ({color = '#1aeddc', ...props}) => {
  return (
    <Svg width={80} height={60} viewBox={`0 0 80 61`} {...props}>
      <Path
        d="M80.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
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
