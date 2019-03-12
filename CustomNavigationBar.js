import * as React from 'react';
import { Animated, View, Dimensions } from 'react-native';
import BigNavigationBarTitle from './BigNavigationBarTitle';

const { width } = Dimensions.get('window');
import { NAVIGATION_BAR_HEIGHT } from './constants';

function interpolateStyles(animatedValue, inputRange, startStyle, endStyle) {
  const interpolatedStyle = {};
  if (endStyle === undefined) return interpolatedStyle;
  Object.keys(endStyle).forEach(key => {
    if (startStyle !== undefined && startStyle[key] !== undefined) {
      interpolatedStyle[key] = animatedValue.interpolate({
        inputRange,
        outputRange: [startStyle[key], endStyle[key]],
        extrapolate: 'clamp'
      });
    }
  });
  return interpolatedStyle;
}

class CustomNavigationBar extends React.Component {
  state = {
    titleWidth: 0
  };

  render() {
    const {
      animatedValue,
      height,
      backgroundColor,
      borderColor,
      image,
      imageStyle,
      title,
      titleStyle,
      bigTitleStyle
    } = this.props;
    const { titleWidth } = this.state;
    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          height: animatedValue.interpolate({
            inputRange: [-1, 0, height - NAVIGATION_BAR_HEIGHT],
            outputRange: [height + 1, height, NAVIGATION_BAR_HEIGHT],
            extrapolateRight: 'clamp'
          }),
          justifyContent: 'flex-end',
          backgroundColor,
          borderBottomWidth: borderColor !== undefined ? 1 : 0,
          borderBottomColor: borderColor
        }}
      >
        {image !== undefined && (
          <Animated.Image
            source={image}
            style={[
              {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: animatedValue.interpolate({
                  inputRange: [0, height - NAVIGATION_BAR_HEIGHT],
                  outputRange: [height, NAVIGATION_BAR_HEIGHT],
                  extrapolate: 'clamp'
                }),
                opacity: animatedValue.interpolate({
                  inputRange: [0, height - NAVIGATION_BAR_HEIGHT],
                  outputRange: [1, 0],
                  extrapolate: 'clamp'
                }),
                transform: [
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [-10, 0],
                      outputRange: [1.1, 1],
                      extrapolateRight: 'clamp'
                    })
                  }
                ]
              },
              imageStyle
            ]}
          />
        )}
        <Animated.View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 15
          }}
        >
          <View
            onLayout={e => {
              this.setState({ titleWidth: e.nativeEvent.layout.width });
            }}
          >
            <BigNavigationBarTitle
              animatedValue={animatedValue}
              bigTitleStyle={[
                interpolateStyles(
                  animatedValue,
                  [0, height - NAVIGATION_BAR_HEIGHT],
                  bigTitleStyle,
                  titleStyle
                ),
                {
                  fontSize: animatedValue.interpolate({
                    inputRange: [-40, 0, height - NAVIGATION_BAR_HEIGHT],
                    outputRange: [44, 36, 18],
                    extrapolate: 'clamp'
                  })
                }
              ]}
            >
              {title}
            </BigNavigationBarTitle>
          </View>
          <Animated.View
            style={{
              width: animatedValue.interpolate({
                inputRange: [0, height - NAVIGATION_BAR_HEIGHT],
                outputRange: [width - titleWidth - 30, 0],
                extrapolate: 'clamp'
              })
            }}
          />
        </Animated.View>
      </Animated.View>
    );
  }
}

export default CustomNavigationBar;
