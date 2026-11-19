window.dataLayer = window.dataLayer || []
function gtag(){window.dataLayer.push(arguments)}
window.gtag = gtag

if (location.hostname === 'mrlivingcapital.com' || location.hostname === 'www.mrlivingcapital.com') {
  const analyticsScript = document.createElement('script')
  analyticsScript.async = true
  analyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-B651X4S3J7'
  document.head.appendChild(analyticsScript)
  gtag('js', new Date())
  gtag('config', 'G-B651X4S3J7', {
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure',
    custom_map: {
      dimension1: 'report_download',
      dimension2: 'geo_region',
      dimension3: 'form_type',
    },
  })
}

window.trackDownload = function(reportName, geo) {
  gtag('event', 'download', {
    event_category: 'report',
    event_label: reportName,
    report_download: reportName,
    geo_region: geo || 'unknown',
  })
}

window.trackFormSubmit = function(formType) {
  gtag('event', 'submit', {
    event_category: 'form',
    event_label: formType,
    form_type: formType,
  })
}
