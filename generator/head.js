const branding = `<link rel="apple-touch-icon" sizes="180x180" href="https://du9l8eemj97rm.cloudfront.net/apple-touch-icon.png">
<link rel="icon" type="image/png" href="https://du9l8eemj97rm.cloudfront.net/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="https://du9l8eemj97rm.cloudfront.net/favicon-16x16.png" sizes="16x16">
<link rel="manifest" href="https://du9l8eemj97rm.cloudfront.net/manifest.json">
<link rel="mask-icon" href="https://du9l8eemj97rm.cloudfront.net/safari-pinned-tab.svg" color="#1db8a4">
<meta name="apple-mobile-web-app-title" content="Students' Union">
<meta name="application-name" content="Students' Union">
<meta name="theme-color" content="#ffffff">`;


function manifestHandler(assets) {
  if (Object.hasOwnProperty.call(assets, 'manifest')) {
    return `
      window['chunkManifest'] = ${JSON.stringify(assets.manifest)};
    `;
  }

  // For development, simple chunk naming proxy
  return `
    window['chunkManifest'] = new Proxy([], {
      get: function(target, chunk) {
        return chunk + '.chunk.js';
      }
    });
  `;
}

export const headContent = (assets, ...more) => `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="${assets.productionFonts.css}" rel="stylesheet" />
<link href="${assets.main.css}" rel="stylesheet" />
${branding}
${more.join('')}
<MSL:JsonUserInfo />
{head_content}
<script type="text/javascript">
  ${manifestHandler(assets)}
</script>
`;

const legacyScripts = `
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/twitter-bootstrap/2.0.4/js/bootstrap.min.js"></script>
{head_content}
`;

export const headContentLegacy = assets => headContent(assets, legacyScripts);
