const routes = [
  {
    path: "/",
    meta: { title: "QRScanner" },
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    name: "scan",
    path: "/scan/",
    meta: { title: "Scan" },
    component: () => import("pages/ScanPage.vue"),
  },
  {
    name: "funcs",
    path: "/funcs/",
    meta: { bar: "Toolbox", title: "Toolbox" },
    component: () => import("layouts/SubLayout.vue"),
    children: [
      {
        name: "fromFiles",
        path: "fromFiles",
        meta: { bar: "File Scanner", title: "File Scanner" },
        component: () => import("pages/ScanfilePage.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    meta: { title: "404" },
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
