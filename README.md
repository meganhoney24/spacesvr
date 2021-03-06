<br/>
<br/>
<p align="center">
    <img width="500" src="https://imgur.com/GkZtmMI.jpg" alt="logo" />
</p>
<h3 align="center">
     Spaces VR
</h3>
<h5 align="center">
     Sleek, powerful front-end framework for quickly creating cross-platform VR Websites.
</h5>
<p align="center">
    <a href="https://spacesvr.io">spacesvr.io</a> · <a href="https://discord.gg/nFHrmUbaz5">discord</a>
<p>
<br/>
<br/>
<br/>
<br/>

<p align="center">
    <a href="https://codesandbox.io/s/nifty-yalow-409u5?hidenavigation=1&theme=dark">
        <img width="274" src="https://i.imgur.com/1wxYJa8.gif" />
    </a>
</p>
<h5 align="center">
    click on the examples above to view the source
</h5>

# Index

[![Version](https://img.shields.io/npm/v/spacesvr?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@react-three/drei)
[![Downloads](https://img.shields.io/npm/dt/spacesvr.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@react-three/drei)
[![Discord Shield](https://img.shields.io/discord/610733384804859934?style=flat&colorA=000000&colorB=000000&label=discord&logo=discord&logoColor=ffffff)](https://discord.gg/nFHrmUbaz5)

<ul>
    <li><a href="#quick-start">Quick Start</a></li>
    <li><a href="#faq">Guide</a></li>
    <li>
        <a href="#documentation">Documentation</a>
        <ul>
            <li><a href="#environments">Environments</a></li>
            <li><a href="#components">Components</a></li>
            <li><a href="#modifiers">Modifiers</a></li>
        </ul>
    </li>
    <li><a href="#examples">Examples</a></li>
</ul>

# Quick Start

#### codesandbox

Visit [this code sandbox](https://codesandbox.io/s/polished-meadow-erzku?fontsize=14&hidenavigation=1&theme=dark) to instantly play with the package

#### npm

You could set up the framework in your sleep. Just import the package

```bash
npm install spacesvr
# or
yarn add spacesvr
```

and copy/paste 9 lines of code

```jsx
import { StandardEnvironment, Logo } from "spacesvr";

const App = () => {
  return (
    <StandardEnvironment>
      <Logo floating rotating />
    </StandardEnvironment>
  );
};
```

# Guide

#### the environment component.

The main functionality comes from the `Environment` components which provide variations of...

- a player with a control scheme
- post processing
- physics
- default components
- loading menu
- pause menu

Under the hood it enables cannon physics and react-three-fiber code with a canvas. All you have
to do is wrap your [react-three-fiber](https://github.com/react-spring/react-three-fiber)
code in an environment and you will be able to navigate your space on mobile and desktop!

#### the useEnvironment Hook.

The `useEnvironment` hook is your direct access to the environment state. It can be used anywhere
inside an `Environment` component and gives you an `EnvironmentState`, defined as:

```jsx
{
  type: Environment; // the type of environment, { STANDARD, TRACK, PORTAL }
  paused: boolean; // whether the pointer lock controls are engaged
  setPaused: (p: boolean, overlay?: string) => void; // set the paused state, along with overlay
  player: PlayerRef;
  overlay: string | null; // null if no overlay enabled or string with id of currenly open overlay
  containerRef: MutableRefObject<HTMLDivElement | null>; // ref to html container (parent of Canvas)
  container: HTMLDivElement | null;
  events: EnvironmentEvent[];
  setPlayer: (p: PlayerRef) => void;
  addEvent: (name: string, callback: (...args: any[]) => void) => void;
}
```

#### modifiers.
Modifiers, add functionality to any 3d component in different ways. For example, the `Floating`
modifier will make its children steadily float up and down. Perfect for quickly adding
animations to components!

```jsx
<Floating height={2} speed={2}>
  <mesh>
    <sphereBufferGeometry args={[1]} />
    <meshStandardMaterial color="white" />
  </mesh>
</Floating>
```

# Documentation

## Environments

#### Standard Environment

The Standard Environment defines the following:

- 2 unit tall player with WASD movement and pointer lock controls on desktop, joystick and drag controls on mobile
- Realistic Effects with FXAA and gamma correction
- Physics enabled, ground plane at y=0
- Custom loading menu
- Custom pause menu

```jsx
<StandardEnvironment
    canvasProps={{...}} // props to be passed along to the r3f canvas
    physicsProps={{...}} // props to be passed along to cannon.js
    player={{
        pos: new Vector3(INIT_X, INIT_Y, INIT_Z),  // initial position
        rot: Math.PI / 2,  // initial rotation
    }}
    effects={RealisticEffects} // custom effects component to override default effects
/>
```

#### Keyframe Environment

The Keyframe Environment defines the following:

- 2 unit tall floating player
- Move with Arrow Keys, A/D movement, or Onscreen Arrows
- Drag Controls, Gryro Controls with Mobile Drag as fallback
- Realistic Effects with FXAA and gamma correction
- Physics enabled, ground plane at y=0
- Custom loading menu
- No pause menu

```jsx
<KeyframeEnvironment
    canvasProps={{...}} // props to be passed along to the r3f canvas
    physicsProps={{...}} // props to be passed along to cannon.js
    player={{
        pos: new Vector3(INIT_X, INIT_Y, INIT_Z),  // initial position
        rot: Math.PI / 2,  // initial rotation
    }}
    effects={RealisticEffects} // custom effects component to override default effects
    keyframes={[
        { label: "home", position: new Vector3(0, 2, 5) },
        { label: "about", position: new Vector3(1, 2, 6), scale: 1.5 }
    ]} // keyframes to travel between
/>
```

## Components

#### Arrow

An arrow icon

```jsx
<Arrow dark={true} />
```

#### Audio

A positional audio component that will play the passed in audio url.

```jsx
<Audio url="https://link-to-your-audio.mp3" position={new Vector3(0, 4, 0)} />
```

#### Background

Easily set the background color of your space

```jsx
<Background color="blue" />
```

#### HDRI

Set the scene background to an hdr file. You can find free hdr files here: https://hdrihaven.com/

```jsx
<HDRI src="https://link-to-your-hdri.hdr" />
```

#### Image

Quickly add an image to your scene

```jsx
<Image
  src="https://link-to-your-image.png"
  ratio={[imageWidth, imageHeight]}
  sizeScale={1}
  framed // adds a frame
  doubleSided // removes back face of frame and creates two opposite facing images
  material={THREE.Material} // custom material for the frame
  color={THREE.Color} // color of the frame
/>
```

#### Logo

Adds a cool Spaces Logo

```jsx
<Logo
  floating // makes logo slowly float
  rotating // makes logo slowly rotate
/>
```

#### Shop

Given Shopify credentials, will populate space with products available for sale.

```jsx
<Shop
  domain="shopify-domain.myshopify.com"
  token="YOUR_SHOPIFY_STOREFRONT_ACCESS_TOKEN"
  itemSize={4} // size of the products on display
/>
```

#### Text

A 3D text component with a default font of Myriad Pro. Custom fonts need to be converted to
a json file, which can be done here: https://gero3.github.io/facetype.js/

```jsx
<Text
  text="Hello Space"
  vAlign="center" // vertical align relative to the y component
  hAlign="center" // horizontal align relative to the x component
  size={1} // scale
  color="#000000" // color
  font={"https://your-font-file.json"} // default is Myriad Pro
  material={THREE.Material} // custom material to pass in
/>
```

#### Video

Add a video file to your space with positional audio

```jsx
<Video
  src="https://link-to-your-video.mp4"
  ratio={[imageWidth, imageHeight]}
  sizeScale={1}
  muted // mutes the video
  framed // adds a frame
  doubleSided // removes back face of frame and creates two opposite facing images
/>
```

## Modifiers

#### Floating

Makes its children float up and down

```jsx
<Floating
  height={1} // the height it should float
  speed={1} // just eyeball it
>
  <Stuff />
</Floating>
```

#### Interactable

Makes its children react to onclick and on hover methods

```jsx
<Interactable
  onClick={() => console.log("Ive been clicked!")}
  onHovered={() => console.log("Ive been hovered!")}
  onUnHovered={() => console.log("Ive been unhovered?")}
>
  <Stuff />
</Interactable>
```

# Examples

<p align="center">
    <a href="https://spaces.gallery/chad">
        <img width="274" src="https://aws1.discourse-cdn.com/standard17/uploads/threejs/original/2X/a/a10b799e732840e53648103104c24e699fb96edc.gif" />
    </a>
</p>

_These examples were made as we were building the framework so the code is outdated_
