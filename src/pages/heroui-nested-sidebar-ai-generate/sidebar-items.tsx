import {Chip} from "@heroui/chip";
import {Icon} from "@iconify/react";

import {SidebarItemType} from "./sidebar";
import TeamAvatar from "./team-avatar";

/**
 * Please check the https://heroui.com/docs/guide/routing to have a seamless router integration
 */

export const items = [
  {
    key: "home",
    href: "#",
    icon: "solar:home-2-linear",
    title: "Home",
  },
  {
    key: "projects",
    href: "#",
    icon: "solar:widget-2-outline",
    title: "Projects",
    endContent: (
      <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
    ),
  },
  {
    key: "tasks",
    href: "#",
    icon: "solar:checklist-minimalistic-outline",
    title: "Tasks",
    endContent: (
      <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
    ),
  },
  {
    key: "team",
    href: "#",
    icon: "solar:users-group-two-rounded-outline",
    title: "Team",
  },
  {
    key: "tracker",
    href: "#",
    icon: "solar:sort-by-time-linear",
    title: "Tracker",
    endContent: (
      <Chip size="sm" variant="flat">
        New
      </Chip>
    ),
  },
  {
    key: "analytics",
    href: "#",
    icon: "solar:chart-outline",
    title: "Analytics",
  },
  {
    key: "perks",
    href: "#",
    icon: "solar:gift-linear",
    title: "Perks",
    endContent: (
      <Chip size="sm" variant="flat">
        3
      </Chip>
    ),
  },
  {
    key: "expenses",
    href: "#",
    icon: "solar:bill-list-outline",
    title: "Expenses",
  },
  {
    key: "settings",
    href: "#",
    icon: "solar:settings-outline",
    title: "Settings",
  },
];

export const sectionItems = [
  {
    key: "overview",
    title: "Overview",
    items: [
      {
        key: "home",
        href: "#",
        icon: "solar:home-2-linear",
        title: "Home",
      },
      {
        key: "projects",
        href: "#",
        icon: "solar:widget-2-outline",
        title: "Projects",
        endContent: (
          <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
        ),
      },
      {
        key: "tasks",
        href: "#",
        icon: "solar:checklist-minimalistic-outline",
        title: "Tasks",
        endContent: (
          <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
        ),
      },
      {
        key: "team",
        href: "#",
        icon: "solar:users-group-two-rounded-outline",
        title: "Team",
      },
      {
        key: "tracker",
        href: "#",
        icon: "solar:sort-by-time-linear",
        title: "Tracker",
        endContent: (
          <Chip size="sm" variant="flat">
            New
          </Chip>
        ),
      },
    ],
  },
  {
    key: "organization",
    title: "Organization",
    icon: "solar:buildings-2-outline",
    type: SidebarItemType.Nest,
    items: [
      {
        key: "departments",
        title: "Departments",
        icon: "solar:users-group-two-rounded-outline",
        type: SidebarItemType.Nest,
        items: [
          {
            key: "engineering",
            title: "Engineering",
            icon: "solar:code-outline",
            type: SidebarItemType.Nest,
            items: [
              {
                key: "frontend",
                title: "Frontend",
                icon: "solar:monitor-outline",
                href: "#",
              },
              {
                key: "backend",
                title: "Backend",
                icon: "solar:server-outline",
                href: "#",
              },
              {
                key: "devops",
                title: "DevOps",
                icon: "solar:settings-outline",
                type: SidebarItemType.Nest,
                items: [
                  {
                    key: "ci_cd",
                    title: "CI/CD",
                    href: "#",
                  },
                  {
                    key: "monitoring",
                    title: "Monitoring",
                    href: "#",
                  }
                ]
              }
            ]
          },
          {
            key: "marketing",
            title: "Marketing",
            icon: "solar:megaphone-outline",
            href: "#",
          }
        ]
      }
    ]
  }
];

export const sectionItemsWithTeams = [
  ...sectionItems,
  {
    key: "your-teams",
    title: "Your Teams",
    items: [
      {
        key: "heroui",
        href: "#",
        title: "HeroUI",
        startContent: <TeamAvatar name="Hero UI" />,
      },
      {
        key: "tailwind-variants",
        href: "#",
        title: "Tailwind Variants",
        startContent: <TeamAvatar name="Tailwind Variants" />,
      },
      {
        key: "heroui-pro",
        href: "#",
        title: "HeroUI Pro",
        startContent: <TeamAvatar name="HeroUI Pro" />,
      },
    ],
  },
];

export const brandItems = [
  {
    key: "overview",
    title: "Overview",
    items: [
      {
        key: "home",
        href: "#",
        icon: "solar:home-2-linear",
        title: "Home",
      },
      {
        key: "projects",
        href: "#",
        icon: "solar:widget-2-outline",
        title: "Projects",
        endContent: (
          <Icon
            className="text-primary-foreground/60"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        ),
      },
      {
        key: "tasks",
        href: "#",
        icon: "solar:checklist-minimalistic-outline",
        title: "Tasks",
        endContent: (
          <Icon
            className="text-primary-foreground/60"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        ),
      },
      {
        key: "team",
        href: "#",
        icon: "solar:users-group-two-rounded-outline",
        title: "Team",
      },
      {
        key: "tracker",
        href: "#",
        icon: "solar:sort-by-time-linear",
        title: "Tracker",
        endContent: (
          <Chip className="bg-primary-foreground font-medium text-primary" size="sm" variant="flat">
            New
          </Chip>
        ),
      },
    ],
  },
  {
    key: "your-teams",
    title: "Your Teams",
    items: [
      {
        key: "heroui",
        href: "#",
        title: "HeroUI",
        startContent: (
          <TeamAvatar
            classNames={{
              base: "border-1 border-primary-foreground/20",
              name: "text-primary-foreground/80",
            }}
            name="Hero UI"
          />
        ),
      },
      {
        key: "tailwind-variants",
        href: "#",
        title: "Tailwind Variants",
        startContent: (
          <TeamAvatar
            classNames={{
              base: "border-1 border-primary-foreground/20",
              name: "text-primary-foreground/80",
            }}
            name="Tailwind Variants"
          />
        ),
      },
      {
        key: "heroui-pro",
        href: "#",
        title: "HeroUI Pro",
        startContent: (
          <TeamAvatar
            classNames={{
              base: "border-1 border-primary-foreground/20",
              name: "text-primary-foreground/80",
            }}
            name="HeroUI Pro"
          />
        ),
      },
    ],
  },
];

export const sectionLongList = [
  ...sectionItems,
  {
    key: "payments",
    title: "Payments",
    items: [
      {
        key: "payroll",
        href: "#",
        title: "Payroll",
        icon: "solar:dollar-minimalistic-linear",
      },
      {
        key: "invoices",
        href: "#",
        title: "Invoices",
        icon: "solar:file-text-linear",
      },
      {
        key: "billing",
        href: "#",
        title: "Billing",
        icon: "solar:card-outline",
      },
      {
        key: "payment-methods",
        href: "#",
        title: "Payment Methods",
        icon: "solar:wallet-money-outline",
      },
      {
        key: "payouts",
        href: "#",
        title: "Payouts",
        icon: "solar:card-transfer-outline",
      },
    ],
  },
  {
    key: "your-teams",
    title: "Your Teams",
    items: [
      {
        key: "heroui",
        href: "#",
        title: "HeroUI",
        startContent: <TeamAvatar name="Hero UI" />,
      },
      {
        key: "tailwind-variants",
        href: "#",
        title: "Tailwind Variants",
        startContent: <TeamAvatar name="Tailwind Variants" />,
      },
      {
        key: "heroui-pro",
        href: "#",
        title: "HeroUI Pro",
        startContent: <TeamAvatar name="HeroUI Pro" />,
      },
    ],
  },
];

export const sectionNestedItems = [
  {
    key: "home",
    href: "#",
    icon: "solar:home-2-linear",
    title: "Home",
  },
  {
    key: "projects",
    href: "#",
    icon: "solar:widget-2-outline",
    title: "Projects",
    endContent: (
      <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
    ),
  },
  {
    key: "tasks",
    href: "#",
    icon: "solar:checklist-minimalistic-outline",
    title: "Tasks",
    endContent: (
      <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
    ),
  },
  {
    key: "team",
    href: "#",
    icon: "solar:users-group-two-rounded-outline",
    title: "Team",
  },
  {
    key: "tracker",
    href: "#",
    icon: "solar:sort-by-time-linear",
    title: "Tracker",
    endContent: (
      <Chip size="sm" variant="flat">
        New
      </Chip>
    ),
  },
  {
    key: "analytics",
    href: "#",
    icon: "solar:chart-outline",
    title: "Analytics",
  },
  {
    key: "perks",
    href: "#",
    icon: "solar:gift-linear",
    title: "Perks",
    endContent: (
      <Chip size="sm" variant="flat">
        3
      </Chip>
    ),
  },
  {
    key: "cap_table",
    title: "Cap Table",
    icon: "solar:pie-chart-2-outline",
    type: SidebarItemType.Nest,
    items: [
      {
        key: "shareholders",
        icon: "solar:users-group-rounded-linear",
        href: "#",
        title: "Shareholders",
      },
      {
        key: "note_holders",
        icon: "solar:notes-outline",
        href: "#",
        title: "Note Holders",
      },
      {
        key: "transactions_log",
        icon: "solar:clipboard-list-linear",
        href: "#",
        title: "Transactions Log",
      },
    ],
  },
  {
    key: "expenses",
    href: "#",
    icon: "solar:bill-list-outline",
    title: "Expenses",
  },
];
export const deepNestedItems = [
  {
    key: "home",
    href: "#",
    icon: "solar:home-2-linear",
    title: "Home",
  },
  {
    key: "projects",
    href: "#",
    icon: "solar:widget-2-outline",
    title: "Projects",
    endContent: (
      <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
    ),
  },
  {
    key: "organization",
    title: "Organization222",
    icon: "tabler:accessible-filled",
    type: SidebarItemType.Nest,
    items: [
      {
        key: "departments",
        title: "Departments",
        icon: "solar:users-group-two-rounded-outline",
        type: SidebarItemType.Nest,
        items: [
          {
            key: "engineering",
            title: "Engineering",
            icon: "solar:code-outline",
            type: SidebarItemType.Nest,
            items: [
              {
                key: "frontend",
                title: "Frontend Team",
                icon: "solar:monitor-outline",
                type: SidebarItemType.Nest,
                items: [
                  {
                    key: "react_team",
                    title: "React Team",
                    href: "#",
                  },
                  {
                    key: "vue_team",
                    title: "Vue Team",
                    href: "#",
                  },
                  {
                    key: "angular_team",
                    title: "Angular Team",
                    href: "#",
                  }
                ]
              },
              {
                key: "backend",
                title: "Backend Team",
                icon: "solar:server-outline",
                type: SidebarItemType.Nest,
                items: [
                  {
                    key: "nodejs_team",
                    title: "Node.js Team",
                    href: "#",
                  },
                  {
                    key: "python_team",
                    title: "Python Team",
                    href: "#",
                  },
                  {
                    key: "java_team",
                    title: "Java Team",
                    href: "#",
                  }
                ]
              },
              {
                key: "devops",
                title: "DevOps",
                icon: "solar:settings-outline",
                type: SidebarItemType.Nest,
                items: [
                  {
                    key: "ci_cd",
                    title: "CI/CD",
                    href: "#",
                  },
                  {
                    key: "monitoring",
                    title: "Monitoring",
                    href: "#",
                  },
                  {
                    key: "infrastructure",
                    title: "Infrastructure",
                    type: SidebarItemType.Nest,
                    items: [
                      {
                        key: "aws",
                        title: "AWS",
                        href: "#",
                      },
                      {
                        key: "kubernetes",
                        title: "Kubernetes",
                        href: "#",
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            key: "marketing",
            title: "Marketing",
            icon: "solar:megaphone-outline",
            type: SidebarItemType.Nest,
            items: [
              {
                key: "digital_marketing",
                title: "Digital Marketing",
                href: "#",
              },
              {
                key: "content_team",
                title: "Content Team",
                href: "#",
              }
            ]
          },
          {
            key: "sales",
            title: "Sales",
            icon: "solar:chart-2-outline",
            href: "#",
          }
        ]
      },
      {
        key: "locations",
        title: "Locations",
        icon: "solar:map-point-outline",
        type: SidebarItemType.Nest,
        items: [
          {
            key: "headquarters",
            title: "Headquarters",
            href: "#",
          },
          {
            key: "branch_offices",
            title: "Branch Offices",
            href: "#",
          }
        ]
      }
    ]
  },
  {
    key: "cap_table",
    title: "Cap Table",
    icon: "solar:pie-chart-2-outline",
    type: SidebarItemType.Nest,
    items: [
      {
        key: "shareholders",
        icon: "solar:users-group-rounded-linear",
        href: "#",
        title: "Shareholders",
      },
      {
        key: "note_holders",
        icon: "solar:notes-outline",
        href: "#",
        title: "Note Holders",
      },
      {
        key: "transactions_log",
        icon: "solar:clipboard-list-linear",
        href: "#",
        title: "Transactions Log",
      },
    ],
  },
  {
    key: "expenses",
    href: "#",
    icon: "solar:bill-list-outline",
    title: "Expenses",
  },
];
