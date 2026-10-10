import React from 'react';

export const HeroIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-[480px] lg:max-w-[620px] mx-auto select-none ${className}`}>
      {/* Decorative ambient glow */}
      <div className="absolute inset-0 bg-radial from-[#FFE8E8]/70 via-[#FFF2F2]/40 to-transparent blur-2xl -z-10 transform scale-110 pointer-events-none" />

      <svg
        viewBox="0 0 700 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm transition-transform duration-700 hover:scale-[1.01]"
        aria-label="Illustration of hands holding a blood donation pack with care"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="bgHeartGradient" x1="150" y1="50" x2="600" y2="580" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF1F1" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FFE6E8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFDDE1" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="bloodPackGradient" x1="380" y1="210" x2="480" y2="510" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E5252A" />
            <stop offset="60%" stopColor="#D0171C" />
            <stop offset="100%" stopColor="#B30F14" />
          </linearGradient>

          <linearGradient id="plasticSheen" x1="350" y1="180" x2="520" y2="480" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="donorSleeve" x1="200" y1="130" x2="310" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E5252A" />
            <stop offset="100%" stopColor="#C91B20" />
          </linearGradient>

          <linearGradient id="doctorSleeve" x1="580" y1="460" x2="670" y2="580" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          <filter id="softGaze" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#E5252A" floodOpacity="0.12" />
          </filter>

          <filter id="labelShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.06" />
          </filter>
        </defs>

        {/* Outer soft heart background blob */}
        <path
          d="M 420 70 
             C 520 20, 660 70, 660 210 
             C 660 360, 480 490, 420 540 
             C 360 490, 200 380, 200 230 
             C 200 110, 310 40, 400 90 
             Z"
          fill="url(#bgHeartGradient)"
          className="transition-all duration-1000"
        />

        {/* Secondary inner soft heart curve */}
        <path
          d="M 430 110 
             C 500 70, 610 110, 610 220 
             C 610 330, 470 440, 430 480 
             C 380 440, 260 350, 260 240 
             C 260 140, 350 90, 415 125 
             Z"
          fill="#FFF5F6"
          opacity="0.6"
        />

        {/* Floating cross/plus medical symbols & subtle hearts */}
        {/* Top Right Plus */}
        <g opacity="0.4" transform="translate(560, 110)">
          <path d="M-4 -12 H4 V-4 H12 V4 H4 V12 H-4 V4 H-12 V-4 H-4 Z" fill="#E5252A" />
        </g>
        {/* Mid Left Plus */}
        <g opacity="0.35" transform="translate(180, 410)">
          <path d="M-3 -9 H3 V-3 H9 V3 H3 V9 H-3 V3 H-9 V-3 H-3 Z" fill="#E5252A" />
        </g>
        {/* Bottom Right Plus */}
        <g opacity="0.45" transform="translate(520, 520)">
          <path d="M-3.5 -10 H3.5 V-3.5 H10 V3.5 H3.5 V10 H-3.5 V3.5 H-10 V-3.5 H-3.5 Z" fill="#E5252A" />
        </g>

        {/* Small floating hearts */}
        <path
          d="M 560 320 C 560 314, 553 310, 547 313 C 543 315, 540 320, 540 322 C 540 320, 537 315, 533 313 C 527 310, 520 314, 520 320 C 520 330, 535 338, 540 342 C 545 338, 560 330, 560 320 Z"
          fill="#FFA4A7"
          opacity="0.55"
        />
        <path
          d="M 235 435 C 235 431, 230 428, 225 430 C 222 431, 220 435, 220 436 C 220 435, 218 431, 215 430 C 210 428, 205 431, 205 435 C 205 442, 216 448, 220 451 C 224 448, 235 442, 235 435 Z"
          fill="#FFA4A7"
          opacity="0.6"
        />
        <path
          d="M 405 540 C 405 536, 400 533, 395 535 C 392 536, 390 540, 390 541 C 390 540, 388 536, 385 535 C 380 533, 375 536, 375 540 C 375 547, 386 553, 390 556 C 394 553, 405 547, 405 540 Z"
          fill="#FFA4A7"
          opacity="0.5"
        />

        {/* Donor Arm & Hand (Left side, Red sleeve) */}
        <g id="donorHand">
          {/* Red Sleeve */}
          <path
            d="M 130 160 L 210 135 L 245 235 L 165 260 Z"
            fill="url(#donorSleeve)"
          />
          {/* Sleeve cuff border */}
          <path
            d="M 208 135 L 245 235"
            stroke="#B51419"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Skin: Forearm & Hand */}
          <path
            d="M 215 142 
               L 310 170 
               C 335 178, 350 188, 360 200 
               C 372 215, 368 230, 350 238
               L 310 248 
               C 285 255, 260 252, 240 235 
               Z"
            fill="#F6B898"
          />

          {/* Fingers gripping the top of the blood bag */}
          {/* Thumb */}
          <path
            d="M 295 195 
               C 315 192, 335 194, 348 206 
               C 353 211, 350 218, 342 220 
               C 328 222, 310 216, 292 212 
               Z"
            fill="#EDB090"
          />
          {/* Index & Middle Finger wrapping around top left edge of pack */}
          <path
            d="M 335 220 
               C 345 225, 365 228, 368 238 
               C 370 245, 362 250, 350 248 
               C 335 246, 320 238, 315 232 
               Z"
            fill="#EDB090"
          />
          {/* Finger crease shading */}
          <path d="M 312 218 C 325 222, 340 224, 346 220" stroke="#DF9A76" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Blood Catheter Tube extending down */}
        <path
          d="M 465 470 
             C 475 510, 480 540, 465 570 
             C 455 590, 410 610, 380 620"
          stroke="#E5252A"
          strokeWidth="6.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />

        {/* BLOOD PACK (Center focal carrier) */}
        <g id="bloodPack" filter="url(#softGaze)">
          {/* Transparent PVC bag outline & background */}
          <rect
            x="360"
            y="170"
            width="190"
            height="290"
            rx="32"
            fill="#FFFFFF"
            fillOpacity="0.75"
            stroke="#CBD5E1"
            strokeWidth="3.5"
          />

          {/* Top hanging tab with suspension eyelet */}
          <path
            d="M 430 170 
               L 430 152 
               C 430 144, 440 138, 455 138 
               C 470 138, 480 144, 480 152 
               L 480 170 
               Z"
            fill="#E2E8F0"
            stroke="#CBD5E1"
            strokeWidth="2.5"
          />
          {/* Tab hole */}
          <circle cx="455" cy="154" r="5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />

          {/* Rich blood liquid fill with curved fluid surface level */}
          <path
            d="M 363 235 
               C 400 232, 430 236, 455 234 
               C 485 232, 515 236, 547 235 
               L 547 428 
               C 547 444, 534 457, 518 457 
               L 392 457 
               C 376 457, 363 444, 363 428 
               Z"
            fill="url(#bloodPackGradient)"
          />

          {/* Top liquid shine / meniscus line */}
          <path
            d="M 368 236 C 410 233, 500 233, 542 236"
            stroke="#FF6B70"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Bottom ports / injection nozzles on pack */}
          <rect x="395" y="457" width="16" height="18" rx="4" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
          <rect x="440" y="457" width="16" height="22" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
          <rect x="495" y="457" width="16" height="18" rx="4" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />

          {/* MEDICAL BLOOD PACK LABEL */}
          <g id="packLabel" filter="url(#labelShadow)">
            <rect
              x="385"
              y="255"
              width="140"
              height="150"
              rx="12"
              fill="#FFFFFF"
            />

            {/* Red blood drop symbol on label */}
            <path
              d="M 425 285 
                 C 425 285, 411 304, 411 315 
                 C 411 323, 417 329, 425 329 
                 C 433 329, 439 323, 439 315 
                 C 439 304, 425 285, 425 285 
                 Z"
              fill="#E5252A"
            />
            {/* White shine on drop */}
            <path
              d="M 420 310 C 418 314, 418 318, 422 320"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Plus sign next to blood drop */}
            <g transform="translate(458, 310)">
              <rect x="-4.5" y="-14" width="9" height="28" rx="2.5" fill="#E5252A" />
              <rect x="-14" y="-4.5" width="28" height="9" rx="2.5" fill="#E5252A" />
            </g>

            {/* Note & measurement lines on label */}
            <rect x="400" y="345" width="110" height="4.5" rx="2" fill="#E2E8F0" />
            <rect x="400" y="358" width="85" height="4" rx="2" fill="#E2E8F0" />
            <rect x="400" y="370" width="95" height="4" rx="2" fill="#E2E8F0" />
            <rect x="400" y="382" width="60" height="4" rx="2" fill="#E2E8F0" />
          </g>

          {/* Glass Plastic Sheen across left side of pack */}
          <path
            d="M 368 185 
               C 368 178, 375 175, 385 175 
               L 415 175 
               L 375 450 
               L 368 440 
               Z"
            fill="url(#plasticSheen)"
          />
        </g>

        {/* Doctor / Healthcare Worker Arm & Hand (Bottom right, White lab coat) */}
        <g id="doctorHand">
          {/* White Doctor Coat Sleeve */}
          <path
            d="M 640 455 
               L 700 480 
               L 645 610 
               L 575 580 
               Z"
            fill="url(#doctorSleeve)"
          />
          {/* Sleeve seam / cuff */}
          <path
            d="M 640 455 L 575 580"
            stroke="#CBD5E1"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Skin: Wrist & Supporting Hand */}
          <path
            d="M 625 470 
               L 535 480 
               C 505 484, 480 495, 460 508 
               C 445 518, 452 534, 472 536 
               C 515 540, 560 528, 595 510 
               Z"
            fill="#EDB090"
          />

          {/* Fingers gently cradling the bottom corner of the blood bag */}
          {/* Index finger */}
          <path
            d="M 505 478 
               C 485 478, 470 484, 462 492 
               C 455 498, 460 505, 472 506 
               C 485 507, 502 500, 520 492 
               Z"
            fill="#F6B898"
          />
          {/* Thumb supporting opposite side */}
          <path
            d="M 545 448 
               C 540 435, 525 432, 515 440 
               C 508 446, 510 456, 522 462 
               C 532 467, 545 464, 550 456 
               Z"
            fill="#F6B898"
          />
          {/* Palm shadow under bag */}
          <path d="M 480 505 C 500 508, 525 502, 545 495" stroke="#DF9A76" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};
