import React from "react";
import { useWindowScroll } from "@mantine/hooks";
import { Affix, Button, Text, Transition } from "@mantine/core";

const BackToTop = () => {
  const [scroll, scrollTo] = useWindowScroll();
  return (
    <div>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button style={transitionStyles} onClick={() => scrollTo({ y: 0 })} color="yellow">
              <i class="fa-solid fa-arrow-up"></i>
            </Button>
          )}
        </Transition>
      </Affix>
    </div>
  );
};

export default BackToTop;
