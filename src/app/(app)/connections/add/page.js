"use client";
import styles from './AddMCP.module.css';
import Link from 'next/link';

export default function AddMCP() {
  return (
    <div className={styles.addMcpContainer}>
      <div className={styles.topBar}>
        <div className={styles.breadcrumb}>
          <Link href="/">
            <svg className={styles.iconSmall} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            Home
          </Link>
          <span>/</span>
          <Link href="/connections">Connections</Link>
          <span>/</span>
          <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
            Add MCP server
          </span>
        </div>
        <Link href="/connections">
          <svg className={styles.closeBtn} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </Link>
      </div>

      <div className={styles.pageContent}>
        <h1 className={styles.title}>Connect an MCP server</h1>
        <p className={styles.subtitle}>Point bereft at any Model Context Protocol endpoint. We'll authenticate, discover its tools, and make them available to your agents.</p>

        <div className={styles.columns}>
          <div className={styles.configSection}>
            <div className={styles.sectionTitle}>Server configuration</div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Server name</label>
              <input type="text" className={styles.inputField} defaultValue="Acme Internal Tools" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>MCP server URL</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <input type="text" className={`${styles.inputField} ${styles.url}`} defaultValue="https://mcp.acme.dev/sse" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Transport</label>
              <div className={styles.toggleGroup}>
                <div className={styles.toggleBtn}>HTTP</div>
                <div className={`${styles.toggleBtn} ${styles.active}`}>SSE</div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Authentication</label>
              <div className={styles.toggleGroup}>
                <div className={styles.toggleBtn}>None</div>
                <div className={`${styles.toggleBtn} ${styles.active}`}>API key</div>
                <div className={styles.toggleBtn}>OAuth</div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>API key</label>
              <input type="text" className={styles.inputField} defaultValue="sk-mcp-•••••••••••3f9a" />
            </div>

            <div className={styles.formActions}>
              <button className={styles.btnTest}>Test connection</button>
              <button className={styles.btnConnect}>Connect server</button>
            </div>
          </div>

          <div className={styles.statusSection}>
            <div className={styles.statusCard}>
              <div className={styles.statusHeader}>
                <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <div>
                  <div className={styles.statusTitle}>Connected</div>
                  <div className={styles.statusMeta}>Handshake successful · 142ms</div>
                </div>
              </div>

              <div className={styles.serverInfo}>
                <div className={styles.serverIcon}>B</div>
                <div>
                  <div className={styles.serverName}>Acme Internal Tools</div>
                  <div className={styles.serverUrl}>mcp.acme.dev/sse</div>
                </div>
              </div>

              <div className={styles.statsRow}>
                <div className={styles.statBadge}><span>12</span> Tools</div>
                <div className={styles.statBadge}><span>4</span> Resources</div>
                <div className={styles.statBadge}><span>2</span> Prompts</div>
              </div>
            </div>

            <div className={styles.toolsCard}>
              <div className={styles.toolsHeader}>
                <div className={styles.toolsTitle}>Discovered tools</div>
                <div className={styles.toolsCount}>12</div>
              </div>

              <div className={styles.toolList}>
                <div className={styles.toolItem}>
                  <div className={styles.toolName}><div className={styles.toolDot}></div> search_records</div>
                  <div className={styles.toolMeta}>read</div>
                </div>
                <div className={styles.toolItem}>
                  <div className={styles.toolName}><div className={styles.toolDot}></div> create_record</div>
                  <div className={`${styles.toolMeta} ${styles.write}`}>write</div>
                </div>
                <div className={styles.toolItem}>
                  <div className={styles.toolName}><div className={styles.toolDot}></div> update_record</div>
                  <div className={`${styles.toolMeta} ${styles.write}`}>write</div>
                </div>
                <div className={styles.toolItem}>
                  <div className={styles.toolName}><div className={styles.toolDot}></div> list_projects</div>
                  <div className={styles.toolMeta}>read</div>
                </div>
                <div className={styles.toolItem}>
                  <div className={styles.toolName}><div className={styles.toolDot}></div> send_message</div>
                  <div className={`${styles.toolMeta} ${styles.write}`}>write</div>
                </div>
                <div className={styles.toolItem}>
                  <div className={styles.toolName}><div className={styles.toolDot}></div> run_query</div>
                  <div className={styles.toolMeta}>read</div>
                </div>
              </div>
              
              <div className={styles.moreTools}>+6 more tools</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
