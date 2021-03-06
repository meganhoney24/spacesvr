import { ReactNode, useCallback, useEffect, useState } from "react";
import { useEnvironmentState, environmentStateContext } from "../utils/hooks";
import BrowserChecker from "../utils/BrowserChecker";
import styled from "@emotion/styled";
import { ProviderProps } from "@react-three/cannon/dist/Provider";
import { Physics } from "@react-three/cannon";
import { Canvas } from "react-three-fiber";
import { ContainerProps } from "react-three-fiber/targets/shared/web/ResizeContainer";
import {
  Environment,
  EnvironmentProps,
  Keyframe,
  KeyframeEnvironmentState,
} from "../types";
import LoadingScreen from "../overlays/LoadingScreen";
import { RealisticEffects } from "../../effects";
import GlobalStyles from "../styles/GlobalStyles";
import SpringPlayer from "../players/SpringPlayer";
import { KeyframeControlDisplay } from "../ui/KeyframeControlDisplay/";
import { config, useSpring } from "react-spring";
import { SpringScaled } from "../../modifiers/SpringScaled";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;

  canvas {
    position: absolute;
    cursor: grab;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    outline: 0;
  }

  &.grabbing {
    canvas {
      cursor: grabbing;
    }
  }
`;

const defaultCanvasProps: Partial<ContainerProps> = {
  shadowMap: true,
  gl: { alpha: false },
  camera: { position: [0, 2, 0], near: 0.01, far: 100 },
};

const defaultPhysicsProps: Partial<ProviderProps> = {
  size: 50,
  allowSleep: false,
  defaultContactMaterial: {
    friction: 0,
  },
};

type KeyframeEnvironmentProps = {
  keyframes: Keyframe[];
  effects?: ReactNode;
};

/**
 *
 * Keyframe environment moves camera between keyframes using arrow keys
 *
 * Player Type: First Person w/ Mouse, Drag controls
 * Physics: Enabled with default y=0 floor plane
 * Loading Screen: Spaces Edition
 * Pause Menu: Spaces Edition
 *
 */

export const KeyframeEnvironment = (
  props: EnvironmentProps & KeyframeEnvironmentProps
) => {
  const { children, canvasProps, physicsProps, keyframes, effects } = props;

  const [keyframeIndex, setKeyframeIndex] = useState(0);
  const scale = keyframes[keyframeIndex].scale || 1;
  const keyframePos = keyframes[keyframeIndex].position;
  const multPos = keyframePos.clone().multiplyScalar(scale);
  const [spring, setSpring] = useSpring(() => ({
    xyzs: [...multPos.toArray(), scale],
    config: { ...config.molasses, precision: 0.0001 },
  }));

  // update keyframe positions
  useEffect(() => {
    const posArray = keyframes[keyframeIndex].position.toArray();
    const scale = keyframes[keyframeIndex].scale || 1;
    setSpring({ xyzs: [...posArray, scale] });
  }, [keyframeIndex]);

  const state = useEnvironmentState();
  const localState: KeyframeEnvironmentState = {
    ...state,
    type: Environment.KEYFRAME,
    keyframes: {
      getCurrent: useCallback(() => keyframes[keyframeIndex], [keyframeIndex]),
      setCurrent: (i: number) => setKeyframeIndex(i),
      frames: keyframes,
      currentFrame: keyframes[keyframeIndex],
      currentIndex: keyframeIndex,
    },
  };

  return (
    <BrowserChecker>
      <GlobalStyles />
      <Container ref={state.containerRef}>
        <Canvas {...defaultCanvasProps} {...canvasProps}>
          <Physics {...defaultPhysicsProps} {...physicsProps}>
            <environmentStateContext.Provider value={localState}>
              <SpringPlayer spring={spring} />
              {effects || <RealisticEffects />}
              <SpringScaled spring={spring}>{children}</SpringScaled>
            </environmentStateContext.Provider>
          </Physics>
        </Canvas>
        <environmentStateContext.Provider value={localState}>
          <LoadingScreen />
          <KeyframeControlDisplay />
        </environmentStateContext.Provider>
      </Container>
    </BrowserChecker>
  );
};
