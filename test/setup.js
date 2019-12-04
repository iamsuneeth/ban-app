jest.mock("react-native-gesture-handler", () => {
  const View = require("react-native/Libraries/Components/View/View");
  const Button = require("react-native/Libraries/Components/Button");
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    /* Buttons */
    RawButton: Button,
    BaseButton: Button,
    RectButton: Button,
    BorderlessButton: Button,
    /* Other */
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {}
  };
});

jest.mock("react-native-reanimated", () => ({
  ...require("react-native-reanimated/mock"),
  default: {
    ...require("react-native-reanimated/mock").default,
    createAnimatedComponent: Component => Component
  }
}));
