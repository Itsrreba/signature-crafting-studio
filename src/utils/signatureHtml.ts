
export const generateSignatureHTML = (signatureData: any, layout: string) => {
  // Generate HTML based on the selected layout
  const baseStyles = `font-family: ${signatureData.font}; color: #333;`;
  let html = '';
  
  switch (layout) {
    case "standard":
      html = `<table style="${baseStyles}" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align: top; padding-right: 15px;">
            ${signatureData.logoUrl ? `<img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 100px;" />` : ''}
          </td>
          <td>
            <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
            <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
            <div style="height: 1px; background-color: #eee; margin: 8px 0;"></div>
            <p style="margin: 5px 0; font-size: 14px;">${signatureData.phone || ''}</p>
            <p style="margin: 5px 0; font-size: 14px;">${signatureData.email || ''}</p>
            <p style="margin: 5px 0; font-size: 14px;">${signatureData.website || ''}</p>
            <p style="margin: 5px 0; font-size: 14px;">${signatureData.address || ''}</p>
          </td>
        </tr>
      </table>`;
      break;
    case "centered":
      html = `<div style="${baseStyles} text-align: center;">
        ${signatureData.logoUrl ? `<div style="margin-bottom: 10px;"><img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 120px;" /></div>` : ''}
        <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
        <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
        <div style="height: 1px; background-color: #eee; width: 50%; margin: 8px auto;"></div>
        <p style="margin: 5px 0; font-size: 14px;">${signatureData.phone || ''}</p>
        <p style="margin: 5px 0; font-size: 14px;">${signatureData.email || ''}</p>
        <p style="margin: 5px 0; font-size: 14px;">${signatureData.website || ''}</p>
        <p style="margin: 5px 0; font-size: 14px;">${signatureData.address || ''}</p>
      </div>`;
      break;
    case "compact":
      html = `<div style="${baseStyles}">
        <div style="display: flex; align-items: center; gap: 10px;">
          ${signatureData.logoUrl ? `<img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 60px;" />` : ''}
          <div>
            <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 16px;">${signatureData.fullName}</h3>
            <p style="margin: 0; font-size: 12px;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
          </div>
        </div>
        <div style="height: 1px; background-color: #eee; margin: 8px 0;"></div>
        <div style="font-size: 12px;">
          <span style="margin-right: 15px;">${signatureData.phone || ''}</span>
          <span style="margin-right: 15px;">${signatureData.email || ''}</span>
          <span style="margin-right: 15px;">${signatureData.website || ''}</span>
          <span>${signatureData.address || ''}</span>
        </div>
      </div>`;
      break;
    case "stacked":
      html = `<div style="${baseStyles}">
        <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px; border-left: 4px solid ${signatureData.primaryColor}; padding-left: 10px;">${signatureData.fullName}</h3>
        <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
        <div style="display: flex; align-items: flex-start; gap: 15px; margin-top: 10px;">
          ${signatureData.logoUrl ? `<img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 80px;" />` : ''}
          <div style="font-size: 14px;">
            <p style="margin: 3px 0;">${signatureData.phone || ''}</p>
            <p style="margin: 3px 0;">${signatureData.email || ''}</p>
            <p style="margin: 3px 0;">${signatureData.website || ''}</p>
            <p style="margin: 3px 0;">${signatureData.address || ''}</p>
          </div>
        </div>
      </div>`;
      break;
    case "icon-list":
      html = `<div style="${baseStyles} text-align: center;">
        ${signatureData.logoUrl ? `<div style="margin-bottom: 10px;"><img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 100px; border-radius: 50%;" /></div>` : ''}
        <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
        <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
        <div style="margin-top: 10px; text-align: left;">
          ${signatureData.phone ? `<p style="margin: 5px 0; display: flex; align-items: center; font-size: 14px;">⚬ ${signatureData.phone}</p>` : ''}
          ${signatureData.email ? `<p style="margin: 5px 0; display: flex; align-items: center; font-size: 14px;">⚬ ${signatureData.email}</p>` : ''}
          ${signatureData.website ? `<p style="margin: 5px 0; display: flex; align-items: center; font-size: 14px;">⚬ ${signatureData.website}</p>` : ''}
          ${signatureData.address ? `<p style="margin: 5px 0; display: flex; align-items: center; font-size: 14px;">⚬ ${signatureData.address}</p>` : ''}
        </div>
      </div>`;
      break;
    case "two-columns":
      html = `<table style="${baseStyles}" cellpadding="0" cellspacing="0">
        <tr>
          <td style="width: 50%; padding-right: 15px; vertical-align: top;">
            <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
            <p style="margin: 5px 0;">${signatureData.jobTitle}</p>
            ${signatureData.logoUrl ? `<img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 100px; margin-top: 10px;" />` : ''}
          </td>
          <td style="width: 50%; vertical-align: top; border-left: 1px solid #eee; padding-left: 15px;">
            <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.companyName}</h3>
            <p style="margin: 5px 0; font-size: 14px;">${signatureData.phone || ''}</p>
            <p style="margin: 5px 0; font-size: 14px;">${signatureData.email || ''}</p>
            <p style="margin: 5px 0; font-size: 14px;">${signatureData.website || ''}</p>
            <p style="margin: 5px 0; font-size: 14px;">${signatureData.address || ''}</p>
          </td>
        </tr>
      </table>`;
      break;
    case "bordered":
      html = `<div style="${baseStyles} text-align: center; border: 2px solid ${signatureData.primaryColor}; padding: 15px; border-radius: 5px;">
        ${signatureData.logoUrl ? `<div style="margin-bottom: 10px;"><img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 100px;" /></div>` : ''}
        <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
        <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
        <div style="display: flex; justify-content: center; gap: 15px; margin-top: 10px; font-size: 14px;">
          ${signatureData.phone ? `<span>${signatureData.phone}</span>` : ''}
          ${signatureData.email ? `<span>${signatureData.email}</span>` : ''}
          ${signatureData.website ? `<span>${signatureData.website}</span>` : ''}
        </div>
        ${signatureData.address ? `<p style="margin: 5px 0; font-size: 14px;">${signatureData.address}</p>` : ''}
      </div>`;
      break;
    case "minimalist":
      html = `<div style="${baseStyles} display: flex; align-items: center;">
        <div style="width: 3px; height: 80px; background-color: ${signatureData.primaryColor}; margin-right: 15px;"></div>
        <div>
          <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
          <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
          <p style="margin: 5px 0; font-size: 14px;">${signatureData.phone || ''} ${signatureData.email ? `| ${signatureData.email}` : ''}</p>
          <p style="margin: 5px 0; font-size: 14px;">${signatureData.website || ''} ${signatureData.address ? `| ${signatureData.address}` : ''}</p>
        </div>
      </div>`;
      break;
    case "bubbles":
      html = `<div style="${baseStyles} text-align: center;">
        ${signatureData.logoUrl ? `<div style="margin-bottom: 10px;"><img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 100px; border-radius: 50%;" /></div>` : ''}
        <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
        <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
        <div style="display: flex; justify-content: center; gap: 10px; margin-top: 10px;">
          ${signatureData.phone ? `<div style="background-color: ${signatureData.primaryColor}; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 14px;" title="${signatureData.phone}">P</div>` : ''}
          ${signatureData.email ? `<div style="background-color: ${signatureData.primaryColor}; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 14px;" title="${signatureData.email}">E</div>` : ''}
          ${signatureData.website ? `<div style="background-color: ${signatureData.primaryColor}; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 14px;" title="${signatureData.website}">W</div>` : ''}
        </div>
      </div>`;
      break;
    case "banner":
      html = `<div style="${baseStyles}">
        <div style="background-color: ${signatureData.primaryColor}; color: white; padding: 10px; text-align: center; margin-bottom: 10px;">
          <h3 style="margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
        </div>
        <div style="padding: 10px;">
          <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
          <p style="margin: 5px 0; font-size: 14px;">${signatureData.phone || ''}</p>
          <p style="margin: 5px 0; font-size: 14px;">${signatureData.email || ''}</p>
          <p style="margin: 5px 0; font-size: 14px;">${signatureData.website || ''}</p>
          <p style="margin: 5px 0; font-size: 14px;">${signatureData.address || ''}</p>
          ${signatureData.logoUrl ? `<div style="margin-top: 10px;"><img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 100px;" /></div>` : ''}
        </div>
      </div>`;
      break;
    case "gradient":
      html = `<div style="${baseStyles} background: linear-gradient(135deg, ${signatureData.primaryColor}20, white); padding: 15px; border-radius: 5px;">
        <div style="text-align: center;">
          <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
          <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
        </div>
        <div style="height: 1px; background-color: ${signatureData.primaryColor}50; margin: 10px 0;"></div>
        <div style="text-align: center; font-size: 14px;">
          <p style="margin: 5px 0;">${signatureData.phone || ''}</p>
          <p style="margin: 5px 0;">${signatureData.email || ''}</p>
          <p style="margin: 5px 0;">${signatureData.website || ''}</p>
          <p style="margin: 5px 0;">${signatureData.address || ''}</p>
        </div>
        ${signatureData.logoUrl ? `<div style="text-align: center; margin-top: 10px;"><img src="${signatureData.logoUrl}" alt="${signatureData.companyName}" style="max-width: 80px;" /></div>` : ''}
      </div>`;
      break;
    default:
      html = `<div style="${baseStyles}">
        <h3 style="color: ${signatureData.primaryColor}; margin: 0; font-size: 18px;">${signatureData.fullName}</h3>
        <p style="margin: 5px 0;">${signatureData.jobTitle} | ${signatureData.companyName}</p>
        <p style="margin: 5px 0; font-size: 14px;">${signatureData.phone || ''}</p>
        <p style="margin: 5px 0; font-size: 14px;">${signatureData.email || ''}</p>
        <p style="margin: 5px 0; font-size: 14px;">${signatureData.website || ''}</p>
        <p style="margin: 5px 0; font-size: 14px;">${signatureData.address || ''}</p>
      </div>`;
  }
  
  return html;
};
