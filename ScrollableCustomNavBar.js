import * as React from 'react';
import {
  Animated,
  View,
  ScrollView,
  Text,
  StatusBar,
  Platform
} from 'react-native';
import NavigationBar from './NavigationBar';
import CustomNavigationBar from './CustomNavigationBar';
import { NAVIGATION_BAR_HEIGHT } from './constants';

class ScrollableCustomNavBar extends React.Component {
  scroll = new Animated.Value(0);

  render() {
    const {
      children,
      height,
      backgroundColor,
      borderColor,
      image,
      imageStyle,
      title,
      titleStyle,
      bigTitleStyle,
      withShadow,
      statusBar
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar {...statusBar} />
        <CustomNavigationBar
          animatedValue={this.scroll}
          height={height}
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          image={image}
          imageStyle={imageStyle}
          title={title}
          titleStyle={titleStyle}
          bigTitleStyle={bigTitleStyle}
          withShadow={withShadow}
        />
        <Animated.ScrollView
          overScrollMode="never"
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scroll } } }],
            {
              useNativeDriver: false
            }
          )}
        >
          <View
            style={{
              height
            }}
          />

          {children}
        </Animated.ScrollView>
      </View>
    );
  }
}

export default ScrollableCustomNavBar;
