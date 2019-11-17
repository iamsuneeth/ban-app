import React, { useCallback, useMemo, useEffect } from "react";
import Animated from "react-native-reanimated";
import { useState } from "react";
import { spring } from "react-native-redash";
const { Value, useCode, set, Clock } = Animated;

export const useTransition = ({
  expanded,
  trigger = true
}: {
  expanded: boolean;
  trigger: boolean;
}): [Animated.Value<0 | 1>, Function, boolean] => {
  const [initial, setinitial] = useState(!trigger);
  const markInitialized = useCallback(() => {
    if (initial) {
      setinitial(false);
    }
  }, []);
  const animation = new Value(expanded || initial ? 0 : 1);
  useCode(() => {
    if (initial) {
      return animation;
    }
    const from = expanded ? 0 : 1;
    const to = expanded ? 1 : 0;
    return set(
      animation,
      spring({
        velocity: new Value(10),
        config: {
          damping: 10
        },
        from,
        to
      })
    );
  }, [expanded]);

  return [animation, markInitialized, initial];
};
