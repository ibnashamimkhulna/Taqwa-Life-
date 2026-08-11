import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Modal } from './components/Modal';
import { LocationModal } from './components/LocationModal';
import { SideDrawer } from './components/SideDrawer';
import { SearchModal } from './components/SearchModal';
import { NotificationsModal } from './components/NotificationsModal';

import { HomeTab } from './components/tabs/HomeTab';
import { SalahTab } from './components/tabs/SalahTab';
import { DhikrTab } from './components/tabs/DhikrTab';
import { QuranTab } from './components/tabs/QuranTab';
import { ProfileTab } from './components/tabs/ProfileTab';

import { QazaSalahView } from './components/views/QazaSalahView';
import { HijriCalendarView } from './components/views/HijriCalendarView';
import { QiblaCompassView } from './components/views/QiblaCompassView';
import { SettingsView } from './components/views/SettingsView';
import { GamifiedDeenView } from './components/views/GamifiedDeenView';
import { PremiumFeaturesModal } from './components/views/PremiumFeaturesModal';
import { PdfQuranView } from './components/views/PdfQuranView';
import { BackgroundIllustration } from './components/BackgroundIllustration';

import { TabType, Language, QazaRecord, AppSettings, PrayerTime } from './types';
import { INITIAL_PRAYER_TIMES, INITIAL_QAZA_RECORD } from './data/prayersData';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [activeSubView, setActiveSubView] = useState<'qaza' | 'hijri' | 'qibla' | 'settings' | 'gamified' | 'premium' | 'pdfquran' | null>(null);
  
  const [language, setLanguage] = useState<Language>('BN');
  const [district, setDistrict] = useState<string>('ঢাকা (Dhaka)');
  const [prayers, setPrayers] = useState<PrayerTime[]>(INITIAL_PRAYER_TIMES);
  const [qazaRecord, setQazaRecord] = useState<QazaRecord>(INITIAL_QAZA_RECORD);

  const [settings, setSettings] = useState<AppSettings>({
    language: 'BN',
    district: 'ঢাকা (Dhaka)',
    madhhab: 'Hanafi',
    calculationMethod: 'Karachi',
    audioNotifications: true,
    vibration: true,
    arabicFontSize: 24
  });

  // UI Overlays
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Custom Feature Modal
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    icon?: React.ReactNode;
  }>({
    isOpen: false,
    title: '',
    description: ''
  });

  const openFeatureModal = (title: string, description: string, icon?: React.ReactNode) => {
    setModalData({
      isOpen: true,
      title,
      description,
      icon
    });
  };

  const closeModal = () => {
    setModalData((prev) => ({ ...prev, isOpen: false }));
  };

  const handleToggleLanguage = () => {
    const nextLang = language === 'BN' ? 'EN' : 'BN';
    setLanguage(nextLang);
    setSettings((prev) => ({ ...prev, language: nextLang }));
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setActiveSubView(null);
  };

  return (
    <div className="w-full h-[100dvh] bg-slate-100 flex justify-center items-stretch sm:items-center p-0 sm:p-3 overflow-hidden select-none overscroll-none">
      {/* Mobile / Web Container Frame */}
      <div className="w-full max-w-md md:max-w-lg bg-stone-50 h-full sm:h-[96vh] sm:max-h-[96vh] sm:rounded-3xl shadow-xl flex flex-col overflow-hidden relative border-0 sm:border border-stone-200/80 overscroll-none">
        
        {/* Dynamic Feature-Matching Hand-drawn Watercolor Background */}
        <BackgroundIllustration
          activeTab={activeTab}
          activeSubView={activeSubView}
        />

        {/* Top App Bar */}
        <Header
          language={language}
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onToggleLang={handleToggleLanguage}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
        />

        {/* Main Scrollable Content Area with Glassmorphism support */}
        <main className="flex-1 overflow-y-auto px-5 py-4 pb-24 relative z-10 overscroll-contain touch-pan-y">
          {activeSubView === 'qaza' && (
            <QazaSalahView
              qazaRecord={qazaRecord}
              onUpdateQaza={setQazaRecord}
              onBack={() => setActiveSubView(null)}
              language={language}
            />
          )}

          {activeSubView === 'hijri' && (
            <HijriCalendarView
              onBack={() => setActiveSubView(null)}
              language={language}
            />
          )}

          {activeSubView === 'qibla' && (
            <QiblaCompassView
              onBack={() => setActiveSubView(null)}
              language={language}
            />
          )}

          {activeSubView === 'settings' && (
            <SettingsView
              settings={settings}
              onUpdateSettings={setSettings}
              onBack={() => setActiveSubView(null)}
              language={language}
              onToggleLang={handleToggleLanguage}
            />
          )}

          {activeSubView === 'gamified' && (
            <GamifiedDeenView
              onBack={() => setActiveSubView(null)}
              language={language}
            />
          )}

          {activeSubView === 'premium' && (
            <PremiumFeaturesModal
              onBack={() => setActiveSubView(null)}
              language={language}
            />
          )}

          {activeSubView === 'pdfquran' && (
            <PdfQuranView
              onBack={() => setActiveSubView(null)}
              language={language}
            />
          )}

          {activeSubView === null && (
            <>
              {activeTab === 'home' && (
                <HomeTab
                  language={language}
                  onOpenFeature={openFeatureModal}
                  onSwitchTab={handleTabChange}
                  onOpenSubView={setActiveSubView}
                  prayers={prayers}
                  district={district}
                  onOpenLocationModal={() => setIsLocationModalOpen(true)}
                />
              )}

              {activeTab === 'salah' && (
                <SalahTab
                  prayers={prayers}
                  language={language}
                  district={district}
                  onDistrictChange={(newDist) => {
                    setDistrict(newDist);
                    setSettings((prev) => ({ ...prev, district: newDist }));
                  }}
                  onOpenFeature={openFeatureModal}
                  onOpenLocationModal={() => setIsLocationModalOpen(true)}
                />
              )}

              {activeTab === 'dhikr' && (
                <DhikrTab
                  language={language}
                  onOpenFeature={openFeatureModal}
                />
              )}

              {activeTab === 'quran' && (
                <QuranTab
                  language={language}
                  onOpenPdfViewer={() => setActiveSubView('pdfquran')}
                />
              )}

              {activeTab === 'profile' && (
                <ProfileTab
                  language={language}
                  district={district}
                  onDistrictChange={setDistrict}
                  qazaRecord={qazaRecord}
                  onOpenSubView={setActiveSubView}
                  onOpenFeature={openFeatureModal}
                />
              )}
            </>
          )}
        </main>

        {/* Custom Feature Modal Popup */}
        <Modal
          isOpen={modalData.isOpen}
          title={modalData.title}
          description={modalData.description}
          icon={modalData.icon}
          onClose={closeModal}
        />

        {/* Side Sliding Drawer */}
        <SideDrawer
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          language={language}
          onToggleLang={handleToggleLanguage}
          onSelectTab={handleTabChange}
          onOpenFeature={openFeatureModal}
          onOpenSubView={setActiveSubView}
          district={district}
        />

        {/* Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          language={language}
          onSelectTab={handleTabChange}
          onOpenFeature={openFeatureModal}
        />

        {/* Notifications Modal */}
        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          language={language}
        />

        {/* Location & District Modal */}
        <LocationModal
          isOpen={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
          currentDistrict={district}
          onSelectDistrict={(newDist) => {
            setDistrict(newDist);
            setSettings((prev) => ({ ...prev, district: newDist }));
          }}
        />

        {/* Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          language={language}
          onTabChange={handleTabChange}
        />

      </div>
    </div>
  );
}
