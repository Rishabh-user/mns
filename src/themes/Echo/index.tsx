import "@/assets/css/vendors/simplebar.css";
import "@/assets/css/themes/echo.css";
import { Transition } from "react-transition-group";
import { useState, useEffect, createRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { selectCOPortalMenu, selectHRISMenu, selectMNSMenu, selectSideMenu, selectStoreMenu } from "@/stores/sideMenuSlice";
import {
  selectCompactMenu,
  setCompactMenu as setCompactMenuStore,
} from "@/stores/compactMenuSlice";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { FormattedMenu, linkTo, nestedMenu, enter, leave } from "./side-menu";
import Lucide from "@/components/Base/Lucide";
import users from "@/fakers/users";
import clsx from "clsx";
import SimpleBar from "simplebar";
import { Menu } from "@/components/Base/Headless";
import NotificationsPanel from "@/components/NotificationsPanel";
import Logo from "../../assets/images/pages/logo.png"
import { Link } from "react-router-dom";

function Main() {
  const dispatch = useAppDispatch();
  const compactMenu = useAppSelector(selectCompactMenu);
  const setCompactMenu = (val: boolean) => {
    localStorage.setItem("compactMenu", val.toString());
    dispatch(setCompactMenuStore(val));
  };
  //const [switchAccount, setSwitchAccount] = useState(false);
  const [notificationsPanel, setNotificationsPanel] = useState(false);
  const [compactMenuOnHover, setCompactMenuOnHover] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [formattedMenu, setFormattedMenu] = useState<
    Array<FormattedMenu | string>
  >([]);
  const sideMenuStore = useAppSelector(selectSideMenu);
  const storeMenuportal = useAppSelector(selectStoreMenu);
  const mnsMenucare = useAppSelector(selectMNSMenu);
  const HRISMenu = useAppSelector(selectHRISMenu);
  const CoPortalMenu = useAppSelector(selectCOPortalMenu);
  //const sideMenu = () => nestedMenu(sideMenuStore, location);
  const scrollableRef = createRef<HTMLDivElement>();

  const [topBarActive, setTopBarActive] = useState(false);

  const toggleCompactMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setCompactMenu(!compactMenu);
  };

  const compactLayout = () => {
    if (window.innerWidth <= 1600) {
      setCompactMenu(true);
    }
  };

  useEffect(() => {
    if (scrollableRef.current) {
      new SimpleBar(scrollableRef.current);
    }

    //setFormattedMenu(sideMenu());
    const formattedMenu = location.pathname.startsWith("/store-portal")
      ? nestedMenu(storeMenuportal, location)
      : location.pathname.startsWith("/mns-care")
      ? nestedMenu(mnsMenucare, location)
      : location.pathname.startsWith("/hris")
      ? nestedMenu(HRISMenu, location)
      : location.pathname.startsWith("/co-portal")
      ? nestedMenu(CoPortalMenu, location)
      : nestedMenu(sideMenuStore, location);
      setFormattedMenu(formattedMenu);

    compactLayout();

    window.onresize = () => {
      compactLayout();
    };
  }, [sideMenuStore, storeMenuportal, mnsMenucare, HRISMenu, CoPortalMenu, location]);

  window.onscroll = () => {
    // Topbar
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      setTopBarActive(true);
    } else {
      setTopBarActive(false);
    }
  };
  

  return (
    <div
      className={clsx([
        "echo mns-main group bg-gradient-to-b from-slate-200/70 to-slate-50 background relative min-h-screen",
        "before:content-[''] before:h-[370px] before:w-screen before:bg-gradient-to-t before:from-theme-1/80 before:to-theme-2 [&.background--hidden]:before:opacity-0 before:transition-[opacity,height] before:ease-in-out before:duration-300 before:top-0 before:fixed",
        "after:content-[''] after:h-[370px] after:w-screen [&.background--hidden]:after:opacity-0 after:transition-[opacity,height] after:ease-in-out after:duration-300 after:top-0 after:fixed after:bg-texture-white after:bg-contain after:bg-fixed after:bg-[center_-13rem] after:bg-no-repeat",
        topBarActive 
        //&& "background--hidden",
      ])}
    >
      <div
        className={clsx([
          "xl:ml-0 shadow-xl transition-[margin,padding] duration-300 xl:shadow-none fixed top-0 left-0 z-50 side-menu group inset-y-0 xl:py-3.5 xl:pl-3.5",
          "after:content-[''] after:fixed after:inset-0 after:bg-black/80 after:xl:hidden",
          { "side-menu--collapsed": compactMenuOnHover },
          { "side-menu--on-hover": compactMenu },
          { "ml-0 after:block": activeMobileMenu },
          { "-ml-[275px] after:hidden": !activeMobileMenu },
        ])}
      >
        <div
          className={clsx([
            "fixed ml-[275px] w-10 h-10 items-center justify-center xl:hidden z-50",
            { flex: activeMobileMenu },
            { hidden: !activeMobileMenu },
          ])}
        >
          <a
            href=""
            onClick={(event) => {
              event.preventDefault();
              setActiveMobileMenu(false);
            }}
            className="mt-5 ml-5"
          >
            <Lucide icon="X" className="w-8 h-8 text-white" />
          </a>
        </div>
        <div
          className={clsx([
            "h-full mt-5 box bg-white/[0.95] rounded-none xl:rounded-xl z-20 relative w-[275px] duration-300 transition-[width] group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:shadow-[6px_0_12px_-4px_#0000000f] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px] overflow-hidden flex flex-col",
          ])}
          onMouseOver={(event) => {
            event.preventDefault();
            setCompactMenuOnHover(false);
          }}
          onMouseLeave={(event) => {
            event.preventDefault();
            setCompactMenuOnHover(true);
          }}
        >
          <div
            className={clsx([
              "relative flex-none hidden xl:flex items-center justify-center z-10 px-5 h-[90px] w-[275px] overflow-hidden relative duration-300 group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px]",
            ])}
          >
            <a
              href="/"
              className="flex items-center transition-[margin] duration-300 group-[.side-menu--collapsed]:xl:ml-2 group-[.side-menu--collapsed.side-menu--on-hover]:xl:ml-0"
            >
              <img src={Logo} alt="MNS" width={99} height={56} />
              
            </a>
            <a
              href=""
              onClick={toggleCompactMenu}
              className="absolute top-4 right-4 group-[.side-menu--collapsed.side-menu--on-hover]:xl:opacity-100  group-[.side-menu--collapsed]:xl:opacity-0 transition-[opacity,transform] 3xl:flex items-center justify-center w-[20px] h-[20px] ml-auto"
            >
              <Lucide icon="AlignJustify" className="w-4 h-4 stroke-[1.3] " />
            </a>
          </div>
          <div
            ref={scrollableRef}
            className={clsx([
              "w-full h-full z-20 px-5 overflow-y-auto overflow-x-hidden pb-3 [-webkit-mask-image:-webkit-linear-gradient(top,rgba(0,0,0,0),black_30px)] [&:-webkit-scrollbar]:w-0 [&:-webkit-scrollbar]:bg-transparent",
              "[&_.simplebar-content]:p-0 [&_.simplebar-track.simplebar-vertical]:w-[10px] [&_.simplebar-track.simplebar-vertical]:mr-0.5 [&_.simplebar-track.simplebar-vertical_.simplebar-scrollbar]:before:bg-slate-400/30",
            ])}
          >
            <ul className="scrollable">
              {/* BEGIN: First Child */}
              {formattedMenu.map((menu, menuKey) =>              
                typeof menu == "string" ? (
                  <li className="side-menu__divider" key={menuKey}>
                    {menu}
                  </li>
                ) : (
                  <li key={menuKey}>
                    <a
                      href={menu.pathname ?? '#'} 
                      target={menu.pathname?.startsWith('http') ? '_blank' : undefined}  
                      rel={menu.pathname?.startsWith('http') ? 'noopener noreferrer' : undefined}                  
                      className={clsx([
                        "side-menu__link",
                        { "side-menu__link--active": menu.active },
                        {
                          "side-menu__link--active-dropdown":
                            menu.activeDropdown,
                        },
                      ])}
                      onClick={(event: React.MouseEvent) => {
                        if (menu.pathname?.startsWith('http')) return;
                        event.preventDefault();
                        linkTo(menu, navigate);
                        setFormattedMenu([...formattedMenu]);
                      }}
                    >
                      {/* <Lucide
                        icon={menu.icon}
                        className="side-menu__link__icon"
                      /> */}
                      <img src={menu.image} alt={menu.title} width={25} height={25} />
                      <div className="side-menu__link__title">{menu.title}</div>
                      {menu.badge && (
                        <div className="side-menu__link__badge">
                          {menu.badge}
                        </div>
                      )}
                      {menu.subMenu && (
                        <Lucide
                          icon="ChevronDown"
                          className="side-menu__link__chevron"
                        />
                      )}
                    </a>
                    {/* BEGIN: Second Child */}
                    {menu.subMenu && (
                      <Transition
                        in={menu.activeDropdown}
                        onEnter={enter}
                        onExit={leave}
                        timeout={300}
                      >
                        <ul
                          className={clsx([
                            "",
                            { block: menu.activeDropdown },
                            { hidden: !menu.activeDropdown },
                          ])}
                        >
                          {menu.subMenu.map((subMenu, subMenuKey) => (
                            <li key={subMenuKey}>
                              <a
                                href=""
                                className={clsx([
                                  "side-menu__link",
                                  { "side-menu__link--active": subMenu.active },
                                  {
                                    "side-menu__link--active-dropdown":
                                      subMenu.activeDropdown,
                                  },
                                ])}
                                onClick={(event: React.MouseEvent) => {
                                  event.preventDefault();
                                  linkTo(subMenu, navigate);
                                  setFormattedMenu([...formattedMenu]);
                                }}
                              >
                                {/* <Lucide
                                  icon={subMenu.icon}
                                  className="side-menu__link__icon"
                                /> */}
                                <img src={menu.image} alt={menu.title} width={25} height={25} />
                                <div className="side-menu__link__title">
                                  {subMenu.title}
                                </div>
                                {subMenu.badge && (
                                  <div className="side-menu__link__badge">
                                    {subMenu.badge}
                                  </div>
                                )}
                                {subMenu.subMenu && (
                                  <Lucide
                                    icon="ChevronDown"
                                    className="side-menu__link__chevron"
                                  />
                                )}
                              </a>
                              {/* BEGIN: Third Child */}
                              {subMenu.subMenu && (
                                <Transition
                                  in={subMenu.activeDropdown}
                                  onEnter={enter}
                                  onExit={leave}
                                  timeout={300}
                                >
                                  <ul
                                    className={clsx([
                                      "",
                                      {
                                        block: subMenu.activeDropdown,
                                      },
                                      { hidden: !subMenu.activeDropdown },
                                    ])}
                                  >
                                    {subMenu.subMenu.map(
                                      (lastSubMenu, lastSubMenuKey) => (
                                        <li key={lastSubMenuKey}>
                                          <a
                                            href=""
                                            className={clsx([
                                              "side-menu__link",
                                              {
                                                "side-menu__link--active":
                                                  lastSubMenu.active,
                                              },
                                              {
                                                "side-menu__link--active-dropdown":
                                                  lastSubMenu.activeDropdown,
                                              },
                                            ])}
                                            onClick={(
                                              event: React.MouseEvent
                                            ) => {
                                              event.preventDefault();
                                              linkTo(lastSubMenu, navigate);
                                              setFormattedMenu([
                                                ...formattedMenu,
                                              ]);
                                            }}
                                          >
                                            {/* <Lucide
                                              icon={lastSubMenu.icon}
                                              className="side-menu__link__icon"
                                            /> */}
                                            <img src={menu.image} alt={menu.title} width={25} height={25} />
                                            <div className="side-menu__link__title">
                                              {lastSubMenu.title}
                                            </div>
                                            {lastSubMenu.badge && (
                                              <div className="side-menu__link__badge">
                                                {lastSubMenu.badge}
                                              </div>
                                            )}
                                          </a>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </Transition>
                              )}
                              {/* END: Third Child */}
                            </li>
                          ))}
                        </ul>
                      </Transition>
                    )}
                    {/* END: Second Child */}
                  </li>
                )
              )}
              {/* END: First Child */}
              <li>
                <div className="flex justify-center my-5">
                  <Link to='/' className="btn btn-primary px-5 py-3">Back to Dashboard</Link>
                </div>
              </li>
            </ul>
            
          </div>
        </div>
        <div className="fixed h-[65px] transition-[margin] duration-100 xl:ml-[275px]  mt-3.5 inset-x-0 top-0">
          <div
            className={clsx([
              "top-bar absolute left-0 right-0 h-full mx-5 group",
              "before:content-[''] before:absolute before:top-0 before:inset-x-0 before:-mt-[15px] before:h-[20px] before:backdrop-blur",
              topBarActive 
              && "top-bar--active",
            ])}
          >
             <div className="container flex items-center w-full h-full ease-in-out duration-300 box shadow-none border-none
                group-[.top-bar--active]:box group-[.top-bar--active] xl:px-5 bg-transparent group-[.top-bar--active]:bg-black">
              <div className="flex items-center gap-1 xl:hidden">
                  <a
                    href=""
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveMobileMenu(true);
                    }}
                    className="p-2 text-white rounded-full hover:bg-white/5"
                  >
                    <Lucide icon="AlignJustify" className="w-[18px] h-[18px]" />
                  </a>
                  
                </div>
                <div className="text-white">Welcome, Rajeev</div>
                
                <div className="flex items-center flex-1">
                  <div className="flex items-center gap-1 ml-auto">                 
                    <a
                      href=""
                      className="p-2 text-white rounded-full font-bold hover:bg-white/5"
                      onClick={(e) => {
                        e.preventDefault();
                        setNotificationsPanel(true);
                      }}
                    >
                      <Lucide icon="Bell" className="w-[25px] h-[25px] font-bold" />
                    </a>
                  </div>
                  <Menu className="ml-5">
                    <Menu.Button className="overflow-hidden rounded-full w-[36px] h-[36px] border-[3px] border-white/[0.15] image-fit">
                      <img
                        alt="Tailwise - Admin Dashboard Template"
                        src={users.fakeUsers()[0].photo}
                      />
                    </Menu.Button>
                    <Menu.Items className="w-56 mt-1">
                      <Menu.Item
                        // onClick={() => {
                        //   navigate("settings");
                        // }}
                      >
                        <Lucide icon="Users" className="w-4 h-4 mr-2" />
                        Profile Info
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        <Lucide icon="Power" className="w-4 h-4 mr-2" />
                        Logout
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              
                <NotificationsPanel
                  notificationsPanel={notificationsPanel}
                  setNotificationsPanel={setNotificationsPanel}
                />
             </div>             
           
          </div>
        </div>
      </div>
      <div
        className={clsx([
          "transition-[margin,width] duration-100 pt-[54px] pb-16 relative z-10 group mode",
          { "xl:ml-[275px]": compactMenu },
          { "xl:ml-[91px]": !compactMenu },
          { "mode--light": !topBarActive },
        ])}
      >
        <div className="xl:px-5 mt-16 mx-5">
          <div className="container">
            <Outlet />
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Main;
