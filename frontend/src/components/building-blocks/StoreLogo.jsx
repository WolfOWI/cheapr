// IMPORT
// -----------------------------------------------------------
// Imagery
import checkersCol from "../../assets/logos/store-logos/checkers_colour.svg";
import checkersWhite from "../../assets/logos/store-logos/checkers_white.svg";
import checkersGrey from "../../assets/logos/store-logos/checkers_grey.svg";
import checkersMiniCol from "../../assets/logos/store-logos/checkers_mini_colour.svg";
import woolworthsCol from "../../assets/logos/store-logos/woolworths_colour.svg";
import woolworthsWhite from "../../assets/logos/store-logos/woolworths_white.svg";
import woolworthsGrey from "../../assets/logos/store-logos/woolworths_grey.svg";
import woolworthsMiniCol from "../../assets/logos/store-logos/woolworths_mini_colour.svg";
import sparCol from "../../assets/logos/store-logos/spar_colour.svg";
import sparWhite from "../../assets/logos/store-logos/spar_white.svg";
import sparGrey from "../../assets/logos/store-logos/spar_grey.svg";
import sparMiniCol from "../../assets/logos/store-logos/spar_mini_colour.svg";
import pnpCol from "../../assets/logos/store-logos/pnp_colour.svg";
import pnpWhite from "../../assets/logos/store-logos/pnp_white.svg";
import pnpGrey from "../../assets/logos/store-logos/pnp_grey.svg";
import pnpMiniCol from "../../assets/logos/store-logos/pnp_mini_colour.svg";

// -----------------------------------------------------------

const StoreLogo = ({ store, type = "colour", className = "" }) => {
  let logo;

  // Logos Map
  const logosMap = {
    checkers: {
      colour: checkersCol,
      white: checkersWhite,
      grey: checkersGrey,
      mini: checkersMiniCol,
    },
    woolworths: {
      colour: woolworthsCol,
      white: woolworthsWhite,
      grey: woolworthsGrey,
      mini: woolworthsMiniCol,
    },
    spar: {
      colour: sparCol,
      white: sparWhite,
      grey: sparGrey,
      mini: sparMiniCol,
    },
    pnp: {
      colour: pnpCol,
      white: pnpWhite,
      grey: pnpGrey,
      mini: pnpMiniCol,
    },
  };

  if (logosMap[store] && logosMap[store][type]) {
    logo = logosMap[store][type];
  } else {
    logo = null;
  }

  return logo ? <img src={logo} alt={`${store} logo`} className={className} /> : null;
};

export default StoreLogo;