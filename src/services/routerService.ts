// 路由参数类型
export interface RouteParams {
  handle: string | null;
  year: number | null;
}

// 解析当前 URL 获取路由参数
export const parseRoute = (): RouteParams => {
  const path = window.location.pathname;
  const parts = path.split('/').filter(Boolean);

  return {
    handle: parts[0] || null,
    year: parts[1] ? parseInt(parts[1], 10) : null
  };
};

// 导航到指定路由
export const navigateTo = (handle?: string, year?: number) => {
  let path = '/';
  if (handle) {
    path = `/${handle}`;
    if (year) {
      path = `/${handle}/${year}`;
    }
  }

  if (window.location.pathname !== path) {
    window.history.pushState({ handle, year }, '', path);
  }
};

// 替换当前路由（不添加历史记录）
export const replaceTo = (handle?: string, year?: number) => {
  let path = '/';
  if (handle) {
    path = `/${handle}`;
    if (year) {
      path = `/${handle}/${year}`;
    }
  }

  window.history.replaceState({ handle, year }, '', path);
};
