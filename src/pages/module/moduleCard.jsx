import React from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Format numbers to k/m (e.g., 123400 -> 123.4k) (I hope to see a m some day!)
const formatDownloads = (num) => {
  if (!num || isNaN(num)) return '0';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
};

// Just something simple
const timeAgo = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) return 'Unknown date';

    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1 || interval < 0) return Math.floor(Math.abs(interval)) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return "Just now";
};

export default function ModuleCard({ module }) {
  if (!ExecutionEnvironment.canUseDOM) {
      return <label>Wait...</label>
  }

  const moduleImgFallback = "/img/156027x2.png";
  const avatarImgFallback = "https://assets.gw2dat.com/733268.png";

  const moduleImgSrc = `https://pkgs.blishhud.com/metadata/img/module/${module.Namespace}.png`;

  return (
      <a class="mc-card" target="_top" href={ `/modules/?module=${module.Namespace}` } >
        <div class="mc-image-container">
          <img
            src={ moduleImgSrc }
            onError={ (e) => {
              e.target.onerror = null;
              e.target.src = moduleImgFallback;
            } }
            alt={`${module.Name} Image`}
          />
          {/* Might add MuklukVideo video popover later */}
          {false && module.MuklukVideo && (
            <div class="mc-video-badge" title="Video Showcase Available">
              ▶
            </div>
          )}
        </div>

        <div class="mc-body">
          <h3 class="mc-title">
            { module.Name }
          </h3>

          <div class="content mc-summary">
            { module.Summary }
          </div>
        </div>

        <div class="mc-footer level is-mobile">
          <div class="level-left">
             <div class="mc-author" title={`Created by ${module.AuthorName}`}>
                <img
                    src={ module.AuthorAvatar }
                    onError={ (e) => { e.target.onerror = null; e.target.src = avatarImgFallback; }}
                    alt={module.AuthorName}
                />
                <a class="mc-author-name" href={`/modules?author=${module.AuthorName}`}>
                    {module.AuthorName}
                </a>
             </div>
          </div>

          <div class="level-right">
             <div class="mc-stats">
                <span class="hint--left" data-hint={`${module.Downloads.toLocaleString()} Total Downloads`}>
                  {formatDownloads(module.Downloads)}
                </span>
                <span class="mc-stat-date hint--left" data-hint={`Last Updated: ${new Date(module.LastUpdate).toLocaleDateString()}`}>
                    {timeAgo(module.LastUpdate)}
                </span>
             </div>
          </div>
        </div>
      </a>
  );
}