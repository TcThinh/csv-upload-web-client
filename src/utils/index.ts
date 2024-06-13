export const sanitizeColumns = (data: any) => {
  return data.map((item: any) => {
    const sanitizedItem: any = {};
    Object.keys(item).forEach((key) => {
      const sanitizedKey = key.toLowerCase().replace(/(\s|-)+/g, "_");
      sanitizedItem[sanitizedKey] = item[key];
    });
    return sanitizedItem;
  });
};
