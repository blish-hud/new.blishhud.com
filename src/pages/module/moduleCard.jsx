import React, { useState } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import '../../css/module-card.css';

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
  const [isLoaded, setIsLoaded] = useState(false);

  if (!ExecutionEnvironment.canUseDOM) {
      return <label>Wait...</label>
  }

  const moduleImgFallback = "/img/156027x2.png";
  const avatarImgFallback = "https://assets.gw2dat.com/733268.png";

  const moduleImgSrc = `https://pkgs.blishhud.com/metadata/img/module/${module.Namespace}.png`;

  return (
      <a class="mc-card" target="_top" href={ `/modules/?module=${module.Namespace}` } >
        <div class="mc-image-container">
          <div className="mc-skeleton"></div>
          <img
            className={`mc-card-image ${isLoaded ? 'is-loaded' : ''}`}
            src={ moduleImgSrc }
            onLoad={() => setIsLoaded(true)}
            onError={ (e) => {
              e.target.onerror = null;
              e.target.src = moduleImgFallback;
              setIsLoaded(true);
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

        { module.AuthorName && (
          <div class="mc-footer level is-mobile">
            <div class="level-left">
              <div class="mc-author" title={`Created by ${module.AuthorName}`}>
                  <img
                      src={ module.AuthorAvatar }
                      onError={ (e) => { e.target.onerror = null; e.target.src = avatarImgFallback; }}
                      alt={module.AuthorName}
                  />
                  <a class="mc-author-name" href={`/modules/?author=${module.AuthorName}`}>
                      {module.AuthorName}
                  </a>
              </div>
            </div>

            <div className="level-right">
              <div className="mc-stats">
                <span className="hint--left" data-hint={`${module.Downloads.toLocaleString()} Total Downloads`}>
                  <svg class="mui-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" aria-label="fontSize small"><path d="M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z"></path></svg>

                  <span className="is-hidden-mobile">
                    &nbsp;{formatDownloads(module.Downloads)}
                  </span>
                  <span className="is-hidden-tablet">
                    &nbsp;{module.Downloads.toLocaleString()} Total Downloads
                  </span>
                </span>

                <span className="hint--left" data-hint={`Last Updated: ${new Date(module.LastUpdate).toLocaleDateString()}`}>
                    <svg class="mui-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" aria-label="fontSize small"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"></path><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
                    
                    <span className="is-hidden-mobile">
                      &nbsp;{timeAgo(module.LastUpdate)}
                    </span>
                    <span className="is-hidden-tablet">
                      &nbsp;Last Updated: {new Date(module.LastUpdate).toLocaleDateString()}
                    </span>
                </span>
              </div>
            </div>
          </div>
        )}
      </a>
  );
}