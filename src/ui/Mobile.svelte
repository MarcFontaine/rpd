<script lang="ts">
import Router from 'svelte-spa-router';
import Navigation from './Navigation.svelte';
import SearchBar from '../bookmarks/SearchBar.svelte';
import {subroutes} from './routes';
</script>

<div class="mobile-phone">
 <div class="screen">
  <div class="content">
    <SearchBar />
  </div>
  <div>
    <Router routes={subroutes} prefix="/sim/mobile" />
  </div>

  <nav class="bottom-nav">
    <a href="#/sim/mobile/rigcontrol">
      <span class="icon">📊</span>
      <span class="label">Stats</span>
    </a>
    
    <a href="#/sim/mobile/settings">
      <span class="icon">⚙️</span>
      <span class="label">Settings</span>
    </a>
  </nav>
 </div>
</div>
  
<style>
  .mobile-phone {
    width: 393px;
    height: 852px;
    container-type: inline-size; 
    container-name: mobile-preview;
    background: #000;
    border-radius: 40px;
    padding: 12px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.2);
    border: 4px solid #333;
    position: relative;
  }
  .screen {
    width: 100%;
    height: 100%;
    background: blue;
    border-radius: 30px;
    overflow-y: auto;
    position: relative;
  }
 .content {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 1rem;
  }
.bottom-nav {
    height: 65px;
    background: #ffffff;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: env(safe-area-inset-bottom);
  }

  .bottom-nav a {
    text-decoration: none;
    color: #666;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.75rem;
  }

  .icon { font-size: 1.5rem; }
</style>
