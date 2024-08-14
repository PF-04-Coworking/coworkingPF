"use client";
import { useEffect } from 'react';

const VoiceflowChat = () => {
  useEffect(() => {
    const loadVoiceflowChat = () => {
      const script = document.createElement('script');
      script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
      script.type = "text/javascript";
      script.onload = () => {
        // @ts-ignore
        window.voiceflow.chat.load({
          verify: { projectID: '66bae7ea646d5d107fa82e05' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production'
        });
      };
      document.body.appendChild(script);
    };

    loadVoiceflowChat();

    return () => {
      // Clean up the script when the component unmounts
      const scripts = document.querySelectorAll('script[src="https://cdn.voiceflow.com/widget/bundle.mjs"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return null;
};

export default VoiceflowChat;