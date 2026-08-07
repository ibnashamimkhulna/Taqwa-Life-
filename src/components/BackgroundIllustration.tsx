import React from 'react';
import { TabType } from '../types';

import bgQuran from '../assets/images/bg_quran_watercolor_1786046324231.jpg';
import bgSalah from '../assets/images/bg_salah_watercolor_1786046336382.jpg';
import bgMakkah from '../assets/images/bg_makkah_watercolor_1786046347536.jpg';
import bgHijri from '../assets/images/bg_hijri_ramadan_watercolor_1786046358285.jpg';
import bgDesert from '../assets/images/bg_desert_history_watercolor_1786046369200.jpg';

const USER_REF_BG = 'https://i.ibb.co.com/WWTrJJVQ/file-000000009698820790e678ae4ba5e579.png';

interface BackgroundIllustrationProps {
  activeTab: TabType;
  activeSubView: string | null;
}

export const BackgroundIllustration: React.FC<BackgroundIllustrationProps> = ({
  activeTab,
  activeSubView
}) => {
  // Determine matching illustration based on active feature
  let bgImage = USER_REF_BG;
  let featureTitle = 'ইসলামিক ব্যাকগ্রাউন্ড';

  if (activeSubView === 'pdfquran' || activeTab === 'quran') {
    bgImage = bgQuran;
    featureTitle = 'কুরআন মাজীদুল কারীম';
  } else if (activeSubView === 'qaza' || activeTab === 'salah') {
    bgImage = bgSalah;
    featureTitle = 'সালাত ও ইবাদাত';
  } else if (activeSubView === 'qibla') {
    bgImage = bgMakkah;
    featureTitle = 'পবিত্র কাবা শরীফ ও কিবলা';
  } else if (activeSubView === 'hijri') {
    bgImage = bgHijri;
    featureTitle = 'হিজরী ক্যালেন্ডার ও রমজান';
  } else if (activeTab === 'dhikr') {
    bgImage = bgHijri;
    featureTitle = "জিকির ও দো'আ";
  } else if (activeSubView === 'gamified') {
    bgImage = bgDesert;
    featureTitle = 'ইসলামিক ইতিহাস ও দ্বীন ভ্রমণ';
  } else if (activeTab === 'home') {
    bgImage = USER_REF_BG;
    featureTitle = 'নূরানী দ্বীন হোম';
  } else {
    bgImage = bgDesert;
    featureTitle = 'ইসলামিক প্রোফাইল';
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Hand-drawn Soft Watercolor Background Image */}
      <img
        key={bgImage}
        src={bgImage}
        alt={featureTitle}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out opacity-85 scale-102"
      />

      {/* Subtle Soft Gradient Overlay to guarantee top negative space and maximum text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/40 via-white/20 to-emerald-950/20 backdrop-blur-[2px]" />

      {/* Top soft vignette for header readability */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-emerald-950/40 to-transparent" />
    </div>
  );
};
