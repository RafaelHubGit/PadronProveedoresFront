import { Tabs, Dropdown, Menu } from "antd";
import { DownOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const menuConfig = [
  { key: "1", label: "Búsqueda de Proveedor", icon: <AppstoreOutlined />, type: "tab", link: "buscarProveedor" },
  {
    key: "3",
    label: "Administración",
    icon: <AppstoreOutlined />,
    type: "dropdown",
    submenu: [
      { key: "3-1", label: "Catálogos", link: "catalogos" },
      { key: "3-1", label: "Configuración de Reportes", link: "configuracionReportes" },
    ],
  }  
];

export const MenuComponent = () => {
  return (
    <div style={{ height: "100%", width: "90vw" }}>
        <Tabs
            defaultActiveKey="1"
            tabPosition="top"
            centered
            items={menuConfig.map((item) => {
                if (item.type === "dropdown") {
                    const menu = (
                    <Menu>
                        {item.submenu?.map((sub) => (
                          <Menu.Item key={sub.key}>
                            {
                              sub.link ? 
                                <Link to={sub?.link}>{sub.label}</Link> 
                                : sub.label
                            }
                          </Menu.Item>
                        ))}
                    </Menu>
                    );

                    return {
                    key: item.key,
                    label: (
                        <Dropdown overlay={menu} trigger={["click"]}>
                        <span style={{ cursor: "pointer" }}>
                            {item.icon} {item.label} <DownOutlined />
                        </span>
                        </Dropdown>
                    ),
                    };
                }

                return {
                    key: item.key,
                    label: item.link ? (
                      <Link to={item.link}>
                        {item.icon} {item.label}
                      </Link>
                    ) : (
                      <span>
                        {item.icon} {item.label}
                      </span>
                    ),
                };
            })}
        />
    </div>
  );
};
