import { Fragment } from "react";
import { Separator } from "../ui/separator";
import ThemeToggle from "../theme-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import { LANDING_NAVBAR } from "@/utils/constants";
import { Button } from "../ui/button";

const LandingNavbar = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <nav className="flex items-center p-2.5 gap-4 justify-around">
        {/* Brand Name */}
        <div>
          <h1 className="text-xl font-semibold tracking-wide">
            Mylo Asset Manager
          </h1>
        </div>
        {/* Navbar */}
        <NavigationMenu>
          <NavigationMenuList>
            {LANDING_NAVBAR.map((item) => (
              <NavigationMenuItem key={item.name}>
                <Link to={item.url}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        {/* Theme Toggle */}
        <div className="flex flex-row gap-2">
          <Button onClick={() => navigate("/register")}>Get Started</Button>
          <ThemeToggle />
        </div>
      </nav>
      <Separator />
    </Fragment>
  );
};

export default LandingNavbar;
