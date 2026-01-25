import React, { useState } from "react";
import MutualConnections from "./MutualConnections";
import ReceivedConnections from "./ReceivedConnections";
import SentConnections from "./SentConnections";
import BlockedConnections from "./BlockedConnections";

export const Connections = () => {
  const [activeTab, setActiveTab] = useState("mutual");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "mutual":
        return <MutualConnections />;
      case "received":
        return <ReceivedConnections />;
      case "sent":
        return <SentConnections />;
      case "blocked":
        return <BlockedConnections />;
      default:
        return <MutualConnections />;
    }
  };

  return (
    <div className="px-3 sm:px-4 py-3 sm:py-4 md:py-5">
      {/* Page Header */}
      <div className="text-center mb-3 sm:mb-4 md:mb-5">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-base-content">
          Connections
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-base-content/70 mt-1">
          Manage your network and connection requests
        </p>
      </div>

      {/* Mobile Dropdown (visible on mobile only) */}
      <div className="flex justify-center mb-3 sm:mb-4 md:hidden">
        <div className="form-control w-full max-w-xs">
          <select
            className="select select-bordered w-full text-sm"
            value={activeTab}
            onChange={(e) => handleTabClick(e.target.value)}
            aria-label="Select connection type"
          >
            <option value="mutual">👥 Mutual Connections</option>
            <option value="received">📥 Received Requests</option>
            <option value="sent">📤 Sent Requests</option>
            <option value="blocked">🚫 Blocked Users</option>
          </select>
        </div>
      </div>

      {/* Desktop/Tablet Tabs (hidden on mobile) */}
      <div className="hidden md:flex justify-center mb-4 md:mb-5">
        <div role="tablist" className="tabs tabs-boxed bg-base-300 p-1.5">
          <button
            role="tab"
            className={`tab tab-md gap-1.5 ${
              activeTab === "mutual" ? "tab-active" : ""
            }`}
            onClick={() => handleTabClick("mutual")}
            aria-label="View mutual connections"
          >
            <span className="text-base">👥</span>
            <span className="text-sm">Mutual Connections</span>
          </button>

          <button
            role="tab"
            className={`tab tab-md gap-1.5 ${
              activeTab === "received" ? "tab-active" : ""
            }`}
            onClick={() => handleTabClick("received")}
            aria-label="View received connection requests"
          >
            <span className="text-base">📥</span>
            <span className="text-sm">Received Requests</span>
          </button>

          <button
            role="tab"
            className={`tab tab-md gap-1.5 ${
              activeTab === "sent" ? "tab-active" : ""
            }`}
            onClick={() => handleTabClick("sent")}
            aria-label="View sent connection requests"
          >
            <span className="text-base">📤</span>
            <span className="text-sm">Sent Requests</span>
          </button>

          <button
            role="tab"
            className={`tab tab-md gap-1.5 ${
              activeTab === "blocked" ? "tab-active" : ""
            }`}
            onClick={() => handleTabClick("blocked")}
            aria-label="View blocked users"
          >
            <span className="text-base">🚫</span>
            <span className="text-sm">Blocked Users</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto max-w-5xl">{renderTabContent()}</div>
    </div>
  );
};
