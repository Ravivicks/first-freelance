import React from "react";
import HeroCarousel from "./HeroCarousel";
import { Card, CardContent } from "./ui/card";
import { useMountedState } from "react-use";

const Hero = () => {
  return (
    <div className="my-8 flex gap-3">
      <HeroCarousel />
    </div>
  );
};

export default Hero;
