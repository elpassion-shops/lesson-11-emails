import { compile } from "handlebars";
import mjml2html from "mjml";
export function generateHTML(mail: string): string {
  const template = compile(`
<mjml>
  <mj-head>
    <mj-style>
      .vote-link {
        display: inline-block;
        font-size: 26px;
        color: #F45E43;
        padding: 16px;
        text-decoration: none;
      }
      .vote-link:hover {
        color: #fff;
        background-color: #F45E43;
      }
    </mj-style>
  </mj-head>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="20px" color="#F45E43" font-family="helvetica" align="center">ELP Bootcamp</mj-text>
        <mj-divider border-color="#F45E43"></mj-divider>
        <mj-text font-size="20px" color="#F45E43" font-family="helvetica">Rate our bootcamp</mj-text>
        <mj-text align="center" font-size="16px" color="#F45E43">
          <a href="http://localhost:3000/api/vote/?email=${mail}&amp;vote=1" class="vote-link">1</a>
          <a href="http://localhost:3000/api/vote/?email=${mail}&amp;vote=2" class="vote-link">2</a>
          <a href="http://localhost:3000/api/vote/?email=${mail}&amp;vote=3" class="vote-link">3</a>
          <a href="http://localhost:3000/api/vote/?email=${mail}&amp;vote=4" class="vote-link">4</a>
          <a href="http://localhost:3000/api/vote/?email=${mail}&amp;vote=5" class="vote-link">5</a>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`);
  return mjml2html(template(mail)).html;
}
