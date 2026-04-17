<!DOCTYPE html>
<html lang="en">
  <head>
    <title>251757 &ndash; [JSC] String#toWellFormed should return stringified value</title>

      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes, viewport-fit=cover">
    <meta name="color-scheme" content="light dark">
    <meta name="theme-color" content="hsl(203.6, 100%, 12%)" />
    
    <meta property="og:site_name" content="WebKit Bugzilla" />
    <meta property="og:title" content="251757 &ndash; [JSC] String#toWellFormed should return stringified value">
    <meta property="og:type" content="object">

    <meta name="twitter:site" content="@webkit">
    <meta name="twitter:card" content="summary_large_image">
    
    <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon-180x180.png">
    
    <link rel="stylesheet" href="https://www.apple.com/wss/fonts?families=SF+Pro,v1" type="text/css">
    <link rel="stylesheet" href="https://www.apple.com/wss/fonts?families=SF+Mono,v2" type="text/css">

<link href="data/assets/43d4a6dcad17a1392fe18d7ffbf2e62b.css?1776291858" rel="stylesheet" type="text/css">

<link href="data/assets/aea344879ce443c24aa459038fb6af17.css?1776291852" rel="stylesheet" type="text/css">

    
<script type="text/javascript" src="data/assets/a7c2f3a028f17a9aa60f56dc9d6e732d.js?1731713409"></script>

    <script type="text/javascript">
    <!--
        document.addEventListener('DOMContentLoaded', () => {
          [...document.getElementsByClassName("tolocaledatetime")].forEach(element => {
            let currentDateTime = new Date(element.textContent);
            element.innerHTML = currentDateTime.toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) + " " + currentDateTime.toLocaleTimeString(undefined, { timeZoneName: "short" });
          });

        });
    
        YAHOO.namespace('bugzilla');
        YAHOO.util.Event.addListener = function (el, sType, fn, obj, overrideContext) {
               if ( ("onpagehide" in window || YAHOO.env.ua.gecko) && sType === "unload") { sType = "pagehide"; };
               var capture = ((sType == "focusin" || sType == "focusout") && !YAHOO.env.ua.ie) ? true : false;
               return this._addListener(el, this._getType(sType), fn, obj, overrideContext, capture);
         };
        if ( "onpagehide" in window || YAHOO.env.ua.gecko) {
            YAHOO.util.Event._simpleRemove(window, "unload", 
                                           YAHOO.util.Event._unload);
        }
        
        function unhide_language_selector() { 
            YAHOO.util.Dom.removeClass(
                'lang_links_container', 'bz_default_hidden'
            ); 
        } 
        YAHOO.util.Event.onDOMReady(unhide_language_selector);

        
        var BUGZILLA = {
            param: {
                cookiepath: '\/',
                maxusermatches: 1000
            },
            constant: {
                COMMENT_COLS: 80
            },
            string: {
                

                attach_desc_required:
                    "You must enter a Description for this attachment.",
                component_required:
                    "You must select a Component for this bug.",
                description_required:
                    "You must enter a Description for this bug.",
                short_desc_required:
                    "You must enter a Summary for this bug.",
                version_required:
                    "You must select a Version for this bug."
            }
              , api_token: ''
        };

    if (history && history.replaceState) {
      if(!document.location.href.match(/show_bug\.cgi/)) {
        history.replaceState( null,
                             "251757 – [JSC] String#toWellFormed should return stringified value",
                             "show_bug.cgi?id=251757" );
        document.title = "251757 – [JSC] String#toWellFormed should return stringified value";
      }
      if (document.location.href.match(/show_bug\.cgi\?.*list_id=/)) {
        var href = document.location.href;
        href = href.replace(/[\?&]+list_id=(\d+|cookie)/, '');
        history.replaceState(null, "251757 – [JSC] String#toWellFormed should return stringified value", href);
      }
    }
    YAHOO.util.Event.onDOMReady(function() {
      initDirtyFieldTracking();

    });
    // -->
    </script>
<script type="text/javascript" src="data/assets/daf5e0fb6826e6a35280e622913f0c4a.js?1731713409"></script>


    


    
    <link rel="search" type="application/opensearchdescription+xml"
                       title="Bugzilla" href="./search_plugin.cgi">
    <link rel="shortcut icon" href="/images/favicon.ico">
  </head>

  <body 
        class="bugs-webkit-org 
                 bz_bug 
                 bz_status_RESOLVED 
                 bz_product_WebKit 
                 bz_component_JavaScriptCore 
                 bz_bug_251757 251757-&amp;ndash;-[jsc]-string#towellformed-should-return-stringified-value yui-skin-sam">


  <div id="header">

    


    <div id="titles">

      <a id="title" href="./"> WebKit Bugzilla</a>



    </div>


<!-- 

        <div id="bug_title">Bug&nbsp;251757: [JSC] String#toWellFormed should return stringified value</div>

-->

    <div id="common_links"><ul class="links">
  <li class="new-bug"><a href="enter_bug.cgi">New</a></li>
  <li class="browse-bugs"><a href="describecomponents.cgi">Browse</a></li>
  <li class="advanced-search"><a href="query.cgi?format=advanced">Search+</a></li>


    
      
      <li id="mini_login_container_top">
  <button id="login_link_top" href="show_bug.cgi?id=251757&amp;GoAheadAndLogIn=1" onclick="document.getElementById('login-dialog').showModal()">Log In</button>
  
  <dialog id="login-dialog">
  <div class="close">
  <a href="#" onclick="document.getElementById('mini_login_top').classList.remove('bz_default_hidden'); document.getElementById('forgot_form_top').classList.add('bz_default_hidden'); document.getElementById('login-dialog').close(); return false;" class="close">&times;</a>
  </div>
<span id="github_mini_login_top" class="bz_default_hidden mini_login_top"></span>
    <form method="post" action="https://bugs.webkit.org/github.cgi">
    <input type="hidden" name="github_secret" value="PjtQLGejfqBl0B97">
    <input type="hidden" name="target_uri" value="https://bugs.webkit.org/show_bug.cgi?id=251757">
    <button name="githubauth" value="Log in with GitHub" class="button github">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="currentColor" d="M39.9827068,2.06038715 C26.6986914,5.02206928 15.8101542,12.3827204 8.31884067,23.5325825 C-4.79095805,43.1755033 -2.17770913,69.5257633 14.5470839,86.3376647 C19.555811,91.3899459 27.1777871,96.2680106 32.9269346,98.140839 L33.5416202,98.3377883 C35.0307543,98.8014854 35.3836071,98.7742569 36.1347271,98.2821121 L36.4598332,98.0622568 C37.3310229,97.448652 37.3694578,97.0097509 37.3694578,92.304583 L37.3694578,87.1651935 L33.5366926,87.3829642 C29.0506155,87.600735 25.5662834,86.8167603 23.4756844,85.0310402 C22.778818,84.4571503 21.4646582,82.5715118 20.4773008,80.7539572 L19.8536874,79.5760386 C18.4740582,77.0427807 17.242091,75.5874553 14.4744392,73.1058792 L13.6695472,72.3890342 C12.8932319,71.6859889 12.9407045,71.5933044 13.6324468,71.0937126 C15.5052752,69.6999799 19.2944861,71.0501586 21.6899643,73.9247323 L22.7390371,75.1881495 C26.1616492,79.2523919 27.6940317,80.4168625 29.8781443,80.8933961 C32.0122976,81.3289376 33.9722341,81.154721 36.9339163,80.283638 C37.3259036,80.1529756 37.8485535,79.2383385 38.1098784,78.1930389 C38.3712031,77.1912935 39.0680696,75.6668983 39.6342734,74.8393695 L40.679573,73.3149743 L37.151687,72.6181078 C29.7474817,71.0937126 25.1742961,68.4369096 22.1690599,63.9072782 C19.3815944,59.72608 18.4669573,56.1110856 18.4234031,49.3601926 L18.4324675,48.1749454 C18.51876,42.850272 19.2446323,40.3337894 21.6049861,37.1593877 L22.2503793,36.3059336 C23.050648,35.2082945 23.1611069,34.7274879 22.9223171,34.0121113 L22.8659263,33.8549157 C22.2126141,32.2869662 22.3868307,25.6667358 23.083697,23.6632448 C23.649901,22.1824037 23.95478,21.921079 25.1307419,21.7904164 C27.0906787,21.5726457 30.7492273,22.835716 34.4513298,24.9263151 L37.6307827,26.7555895 L40.4182483,26.1022773 C44.3816758,25.1876401 56.2719582,25.2311943 59.8433984,26.1022773 L62.5437556,26.7991435 L65.0698962,25.2747485 C68.4235657,23.2712575 72.6918723,21.7033083 74.8260256,21.7033083 L75.3880613,21.7095181 C76.535526,21.7482235 76.6117457,22.02452 77.2215036,23.968124 C77.9207898,26.395058 78.0761866,30.6867545 77.5409306,33.027357 L77.4392744,33.4193742 C77.0908413,34.7259987 77.1779497,35.117986 78.1361408,36.3810563 C82.8835429,42.6528537 83.4061928,53.0622951 79.3992112,61.5989084 C76.698854,67.2173935 70.9932605,71.1372668 63.3277305,72.5745536 L59.6691819,73.2714201 L61.0193606,75.6668983 L62.4130932,78.1059306 L62.5437556,87.8185058 L62.7179722,97.5310809 L63.8068259,98.2279473 C64.7558478,98.8468746 65.0012471,98.8794498 66.8020229,98.2516071 L67.1169411,98.140839 C70.6012732,96.9648769 76.5681916,93.74187 79.8347527,91.2592835 C99.2599028,76.7121978 105.5317,50.6232629 94.7738257,28.9332968 C88.4584741,16.1719313 76.5246374,6.37224799 62.8486347,2.71369941 C56.8817163,1.14574994 45.6447461,0.797316839 39.9827068,2.06038715 Z"/></svg>Sign in with GitHub</button>
    </form>
  
  <p class="divider">or</p>
  
  <form action="show_bug.cgi?id=251757" method="POST"
        id="mini_login_top" class="mini_login dialog-grid">
        
    <input id="Bugzilla_login_top" required autofocus
           name="Bugzilla_login" class="bz_login"
        type="email" placeholder="Email Address">
    <input class="bz_password" name="Bugzilla_password" type="password"
           id="Bugzilla_password_top" required
           placeholder="Password">
    <input type="hidden" name="Bugzilla_login_token"
           value="1776456720-5MOB37YgCvhQXEO4pk_Se5NucRjX2clIlTwHqmH3nU8">
    <input type="submit" name="GoAheadAndLogIn" value="Log in"
            id="log_in_top">
                
      <label for="Bugzilla_remember_top"><input type="checkbox" id="Bugzilla_remember_top" 
             name="Bugzilla_remember" value="on" class="bz_remember"
             > Remember my login</label>
    
    <div class="links">
    <a id="create_account_link_top" href="/createaccount.cgi">Create Account</a> 
    
    &middot;
              
    <a id="forgot_link_top" href="show_bug.cgi?id=251757&amp;GoAheadAndLogIn=1#forgot"
       onclick="document.getElementById('mini_login_top').classList.toggle('bz_default_hidden');
                document.getElementById('forgot_form_top').classList.toggle('bz_default_hidden');
                return false;">Forgot Password</a>
    </div>
  </form>
  
    <form action="token.cgi" method="post" id="forgot_form_top"
          class="mini_forgot dialog-grid bz_default_hidden">
      <h2>Forgotten password account recovery</h2>
      <input name="loginname" size="20" id="login_top" required
          type="email" placeholder="Your Email Address">
      <input id="forgot_button_top" value="Reset Password" type="submit">
      <input type="hidden" name="a" value="reqpw">
      <input type="hidden" id="token_top" name="token"
             value="1776456720-PhhB47-rqEFgz82an2TycuzxkycwTi5EljsP9mlWlJs">
    </form>
  
  </dialog>
  

</li>
    
    <li class="quicksearch">
    <form action="buglist.cgi" method="get"
        onsubmit="if (this.quicksearch.value == '') { document.location.assign('/query.cgi'); return false; } else return true;">
    <input type="hidden" id="no_redirect_top" name="no_redirect" value="0">
    <script type="text/javascript">
      if (history && history.replaceState) {
        var no_redirect = document.getElementById("no_redirect_top");
        no_redirect.value = 1;
      }
    </script>
    <input class="search-input" type="search" id="quicksearch_top" name="quicksearch" 
           title="Quick Search" value="">
    <!-- <input class="btn" type="submit" value="Search" 
           id="find_top"> --></form></li>
  </ul>
    </div>
  </div>


  <main id="bugzilla-body">
    <section>


<script type="text/javascript">
<!--

//-->
</script>

<form name="changeform" id="changeform" method="post" action="process_bug.cgi">
<div class="mobile-button-positioning mobile-hidden">
  <div class="mobile-save-overlay">
  <input type="submit" value="Save Changes" 
         id="mobile-commit">
  </div>
</div>

  <input type="hidden" name="delta_ts" value="2023-02-16 09:00:58">
  <input type="hidden" name="id" value="251757">
  <input type="hidden" name="token" value="1776456720-MKoXZQWEjt8kcNwOTLCaB_uVRIdQt3yr-xIC_TsRsGE">
<div class="bz_short_desc_container edit_form">
     <div id="bug-id-status">
     <span class="bug-status status-resolved">RESOLVED
          FIXED</span><a href="show_bug.cgi?id=251757" class="bug_id">251757</a>
     </div>
     <style>
     a.bug_id::before {
       content: "Bug ";
       -webkit-user-select: none;
       user-select: none;
     }
     </style>
     <span id="summary_container" class="bz_default_hidden">
      <span id="short_desc_nonedit_display">[JSC] String#toWellFormed should return stringified value <pre id="commit-urls">https://bugs.webkit.org/show_bug.cgi?id=251757</pre></span>
     </span>
    <div id="summary_input"><span class="field_label "
    id="field_label_short_desc">


  <a 
      title="The bug summary is a short sentence which succinctly describes what the bug is about."
      class="field_help_link field-label"
      href="page.cgi?id=fields.html#short_desc"
  >Summary</a>

</span>[JSC] String#toWellFormed should return stringified value
    </div>
  </div>
  <script type="text/javascript"> 
    const container = document.getElementById('summary_container')
    const input = document.getElementById('summary_input');
    const editButton = document.getElementById('summary_edit_action');
    
    container.classList.remove('bz_default_hidden');
    input.classList.add('bz_default_hidden');
    editButton.addEventListener('click', () => {
      container.classList.toggle('bz_default_hidden');
      input.classList.toggle('bz_default_hidden');
      document.querySelectorAll('.mobile-hidden').forEach(element => {
        element.classList.toggle('mobile-hidden');
      });
    });
    
    function selectText(node) {    
        if (document.body.createTextRange) {
            const range = document.body.createTextRange();
            range.moveToElementText(node);
            range.select();
        } else if (window.getSelection) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(node);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    
    let copyCommitlogElement = document.getElementById('copy-commitlog');
    copyCommitlogElement.addEventListener('click', (e) => {
      e.preventDefault();
      let text = document.getElementById('short_desc').value + "\n" + document.getElementById('commit-urls').textContent;
      navigator.clipboard.writeText(text).then(function() {
        copyCommitlogElement.classList.add('clicked');
        setTimeout(function () {
          copyCommitlogElement.classList.remove('clicked');  
        }, 3000);
      });
    });
    
    // Add Radar URL
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('#comments .bz_comment').forEach((comment) => {
          let email = comment.querySelector('.bz_comment_user .email');
          if (email && email.getAttribute('href') != 'mailto:webkit-bug-importer@group.apple.com')
            return;
          let commentText = comment.querySelector('.bz_comment_text');
          let rdar = commentText.textContent.match(/rdar:\/\/.*?\d+/)
          let commit_urls = document.getElementById('commit-urls');
          if (rdar?.length > 0)
            commit_urls.innerHTML += "\n" + rdar.toString().replace('/problem','');
      });
    });
    
  </script>
  
  <section class="comments-section">
    
    
    <div id="comments"><script src="js/comments.js?1776291701" type="text/javascript"></script>

<script type="text/javascript">
<!--
  /* Adds the reply text to the 'comment' textarea */
  function replyToComment(id, real_id, name) {
      var prefix = "(In reply to " + name + " from comment #" + id + ")\n";
      var replytext = "";
        /* pre id="comment_name_N" */
        var text_elem = document.getElementById('comment_text_'+id);
        var text = getText(text_elem);
        replytext = prefix + wrapReplyText(text);


      /* <textarea id="comment"> */
      var textarea = document.getElementById('comment');
      if (textarea.value != replytext) {
          textarea.value += replytext;
      }

      textarea.focus();
  } 
//-->
</script>


<!-- This auto-sizes the comments and positions the collapse/expand links 
     to the right. -->
<div class="bz_comment_table">
<div id="c0" class="bz_comment bz_first_comment">

      <div class="bz_first_comment_head">
        <div class="bz_comment_user">
          <span class="vcard"><span class="fn">zloirock</span>
</span>
          
          
          <span class="bz_comment_user_images">
          </span>

        </div>


        <div class="bz_comment_meta">
          <a href="show_bug.cgi?id=251757#c0">Reported</a>
          <span class="bz_comment_time torelativedatetime" data-ts="2023-02-05 09:38:07">2023-02-05 09:38:07 PST</span>
          
        </div>

      </div>




<div class="bz_comment_text">String.prototype.toWellFormed.call(1) === '1' // =&gt; false

<a rel="nofollow" href="https://github.com/zloirock/core-js/commit/3156638715b5c5c4f07144da28d2e17039240323">https://github.com/zloirock/core-js/commit/3156638715b5c5c4f07144da28d2e17039240323</a>

<a rel="nofollow" href="https://tc39.es/proposal-is-usv-string/#sec-string.prototype.towellformed">https://tc39.es/proposal-is-usv-string/#sec-string.prototype.towellformed</a> step 2</div>
    </div>
    
    

        
        
        <script src="js/status-bubble.js?1776291701"></script>
<script type="text/javascript">
<!--
window.addEventListener('message', handleStatusBubbleMessage, false);

function toggle_display(link) {
    var table = document.getElementById("attachment_table");
    var view_all = document.getElementById("view_all");
    var hide_obsolete_url_parameter = "&hide_obsolete=1";
    // Store current height for scrolling later
    var originalHeight = table.offsetHeight;
    var rows = YAHOO.util.Dom.getElementsByClassName(
        'bz_tr_obsolete', 'tr', table);

    for (var i = 0; i < rows.length; i++) {
        bz_toggleClass(rows[i], 'bz_default_hidden');
    }

    if (YAHOO.util.Dom.hasClass(rows[0], 'bz_default_hidden')) {
        link.innerHTML = "Show Obsolete";
        view_all.href = view_all.href + hide_obsolete_url_parameter 
    }
    else {
        link.innerHTML = "Hide Obsolete";
        view_all.href = view_all.href.replace(hide_obsolete_url_parameter,"");
    }

    var newHeight = table.offsetHeight;
    // This scrolling makes the window appear to not move at all.
    window.scrollBy(0, newHeight - originalHeight);

    return false;
}
//-->
</script>

<table id="attachment_table">
  <tr id="a0">
    <th colspan="3" class="left">
      Attachments
    </th>
  </tr>



  <tr class="bz_attach_footer">
    <td colspan="3">
        <a class="small button" href="attachment.cgi?bugid=251757&amp;action=enter">Add attachment</a>
        <em>proposed patch, testcase, etc.</em>
    </td>
  </tr>
</table>
        
        
        
          
    


    <div id="c1" class="bz_comment">

      <div class="bz_comment_head">
        <div class="bz_comment_user">
          <span class="vcard"><span class="fn">Radar WebKit Bug Importer</span>
</span>
          
          
          <span class="bz_comment_user_images">
          </span>

        </div>


        <div class="bz_comment_meta">
          <a href="show_bug.cgi?id=251757#c1">Comment 1</a>
          <span class="bz_comment_time torelativedatetime" data-ts="2023-02-06 16:33:31">2023-02-06 16:33:31 PST</span>
          
        </div>

      </div>




<div class="bz_comment_text">&lt;<a href="rdar://problem/105104668">rdar://problem/105104668</a>&gt;</div>
    </div>
    


    <div id="c2" class="bz_comment">

      <div class="bz_comment_head">
        <div class="bz_comment_user">
          <span class="vcard"><span class="fn">Yusuke Suzuki</span>
</span>
          
          
          <span class="bz_comment_user_images">
          </span>

        </div>


        <div class="bz_comment_meta">
          <a href="show_bug.cgi?id=251757#c2">Comment 2</a>
          <span class="bz_comment_time torelativedatetime" data-ts="2023-02-08 16:18:04">2023-02-08 16:18:04 PST</span>
          
        </div>

      </div>




<div class="bz_comment_text">Pull request: <a rel="nofollow" href="https://github.com/WebKit/WebKit/pull/9842">https://github.com/WebKit/WebKit/pull/9842</a></div>
    </div>
    


    <div id="c3" class="bz_comment">

      <div class="bz_comment_head">
        <div class="bz_comment_user">
          <span class="vcard"><span class="fn">EWS</span>
</span>
          
          
          <span class="bz_comment_user_images">
          </span>

        </div>


        <div class="bz_comment_meta">
          <a href="show_bug.cgi?id=251757#c3">Comment 3</a>
          <span class="bz_comment_time torelativedatetime" data-ts="2023-02-08 17:42:19">2023-02-08 17:42:19 PST</span>
          
        </div>

      </div>




<div class="bz_comment_text">Committed <a href="https://commits.webkit.org/260043@main">260043@main</a> (aa30fafbe181): &lt;<a rel="nofollow" href="https://commits.webkit.org/260043&#64;main">https://commits.webkit.org/260043&#64;main</a>&gt;

Reviewed commits have been landed. Closing PR #9842 and removing active labels.</div>
    </div>
    

  <div id="add_comment" class="bz_section_additional_comments">
    <fieldset class="note">
      <legend>Note</legend>
      You need to
      <a href="show_bug.cgi?id=251757&amp;GoAheadAndLogIn=1">log in</a>
      before you can comment on or make changes to this bug.
    </fieldset>
  </div>


  

</div>
    </div>
    
  </section>
  <aside id="bug_details" class="edit_form mobile-hidden">

    <div class="section-status"><div id="status"><div class="field-container"><th class="field_label "
    id="field_label_bug_status">


  <a 
      title="A bug may be in any of a number of states."
      class="field_help_link field-label"
      href="page.cgi?id=fields.html#bug_status"
  >Status</a>

</th>
  <span class="field_value "
      id="field_container_bug_status" >RESOLVED

</span>
</div>

    <noscript><br>resolved&nbsp;as&nbsp;</noscript>

  <span id="resolution_settings"><div class="field-container"><th class="field_label "
    id="field_label_resolution">


  <a 
      title="If a bug is in a resolved state, then one of these reasons will be given for its resolution."
      class="field_help_link field-label"
      href="page.cgi?id=fields.html#resolution"
  >Resolution</a>

</th>
  <span class="field_value "
      id="field_container_resolution" >FIXED

</span>
</div>
  </span>

</div>

<script type="text/javascript">
  var close_status_array = [
      'RESOLVED'
  ];
  YAHOO.util.Dom.removeClass('dup_id_discoverable', 'bz_default_hidden');
  hideEditableField( "dup_id_container", "dup_id", 'dup_id_edit_action',
                     'dup_id', '' )
  showHideStatusItems( "",  ['',
                             'RESOLVED']);
  YAHOO.util.Event.addListener( 'bug_status', "change", showHideStatusItems,
                                ['',
                                 'RESOLVED']);
  YAHOO.util.Event.addListener( 'resolution', "change", showDuplicateItem);
  YAHOO.util.Event.addListener( 'dup_id_discoverable_action',
                                'click',
                                setResolutionToDuplicate,
                                'RESOLVED');
  YAHOO.util.Event.addListener( window, 'load',  showHideStatusItems,
                              ['',
                               'RESOLVED'] );

</script>
  </div>
    
    <div class="section-priority">
      <span class="severity"><div class="field-container"><th class="field_label "
    id="field_label_priority">


  <a 
      title="Engineers prioritize their bugs using this field."
      class="field_help_link field-label"
      href="page.cgi?id=fields.html#priority"
  >Priority</a>

</th>
  <span class="field_value "
      id="field_container_priority" >P2

</span>
</div>
       <div class="field-container"><th class="field_label "
    id="field_label_bug_severity">


  <a 
      title="How severe the bug is, or whether it's an enhancement."
      class="field_help_link field-label"
      href="page.cgi?id=fields.html#bug_severity"
  >Severity</a>

</th>
  <span class="field_value "
      id="field_container_bug_severity" >Normal

</span>
</div>
      </span>
    </div>

    <div class="section-classification bz_default_hidden"><div class="field-container"><th class="field_label "
    id="field_label_classification">


  <a 
      title="Bugs are categorised into Classifications, Products and Components. classifications is the top-level categorisation."
      class="field_help_link field-label"
      href="page.cgi?id=fields.html#classification"
  >Classification</a>

</th>
  <span class="field_value "
      id="field_container_classification" >Unclassified

</span>
</div>
    </div>
    <div class="section-version">
<th class="field_label "
    id="field_label_version">


  <a 
      title="The version field defines the version of the software the bug was found in."
      class="field_help_link field-label"
      href="page.cgi?id=fields.html#version"
  >Version</a>

</th>
<td>Safari Technology Preview
  </td>

    </div>
        
    
        
    <div class="section-platform"><div class="field-container"><th class="field_label "
    id="field_label_rep_platform">


  <a 
      title="The hardware platform the bug was observed on. Note: When searching, selecting the option &quot;All&quot; only finds bugs whose value for this field is literally the word &quot;All&quot;."
      class="field_help_link field-label"
      href="page.cgi?id=fields.html#rep_platform"
  >Hardware</a>

</th>
  <span class="field_value "
      id="field_container_rep_platform" >All

</span>
</div>
        <div class="field-container"><th class="field_label "
    id="field_label_op_sys">


  <a 
      title="The operating system the bug was observed on. Note: When searching, selecting the option &quot;All&quot; only finds bugs whose value for this field is literally the word &quot;All&quot;."
      class="field_help_link field-label"
      href="page.cgi?id=fields.html#op_sys"
  >OS</a>

</th>
  <span class="field_value "
      id="field_container_op_sys" >All

</span>
</div>
    </div>

    
    
    
    <div class="section-product"><div class="field-container"><th class="field_label "
    id="field_label_product">


  <a 
      title="Bugs are categorised into Products and Components."
      class="field_help_link field-label"
      href="describecomponents.cgi"
  >Product</a>

</th>
  <span class="field_value "
      id="field_container_product" >WebKit

</span>
</div>
    </div>
        
    
    
    <div class="section-component"><div class="field-container"><th class="field_label "
    id="field_label_component">


  <a 
      title="Components are second-level categories; each belongs to a particular Product. Select a Product to narrow down this list."
      class="field_help_link field-label"
      href="describecomponents.cgi?product=WebKit"
  >Component</a>

</th>
  <span class="field_value "
      id="field_container_component" >JavaScriptCore

</span>
</div>
    </div>
    
        <div class="section-people"><th class="field_label "
    id="field_label_assigned_to">


  <a 
      title="The person in charge of resolving the bug."
      class="field_help_link field-label"
      href="page.cgi?id=fields.html#assigned_to"
  >Assignee</a>

</th>
      <div><span class="vcard"><span class="fn">Yusuke Suzuki</span>
</span>
      </div>
    </div>


    <script type="text/javascript">
      assignToDefaultOnChange(['product'],
        'webkit-unassigned\x40lists.webkit.org',
        '');
    </script>
    
    <div class="section-reported">
    <label class="field_label">
      Reported
    </label>
    <div>2023-02-05 09:38 PST
    </div>
  </div>
  
  <div class="section-modified">
    <label class="field_label">
      Modified
    </label>
    <div>2023-02-16 09:00 PST
      <a href="show_activity.cgi?id=251757" class="button small">History</a>
    </div>
  
  </div>
    <div class="section-cclist">
      <label  class="field_label"  accesskey="a">
        CC List
      </label>
      <div>
        <div>5 
          users
          <span id="cc_edit_area_showhide_container" class="bz_default_hidden">
            <a href="#" id="cc_edit_area_showhide" class="button small">Show</a>
          </span>
        </div>
        <div id="cc_edit_area">
            <select id="cc" multiple="multiple" size="5" >
                <option value="aleten2015">aleten2015</option>
                <option value="mark.lam">mark.lam</option>
                <option value="msaboff">msaboff</option>
                <option value="webkit-bug-importer">webkit-bug-importer</option>
                <option value="ysuzuki">ysuzuki</option>
            </select>
        </div>
          <script type="text/javascript">
            hideEditableField( 'cc_edit_area_showhide_container', 
                               'cc_edit_area', 
                               'cc_edit_area_showhide', 
                               '', 
                               '');  
          </script>
      </div>
    </div>
        <div class="section-url"><th class="field_label "
    id="field_label_bug_file_loc">


  <a 
      title="Bugs can have a URL associated with them - for example, a pointer to a web site where the problem is seen."
      class="field_help_link field-label"
      href="page.cgi?id=fields.html#bug_file_loc"
  >URL</a>

</th>
    <div>
      <div id="bz_url_input_area"><td>  
  </td>
      </div>
    </div>
  </div>


    <div class="section-keywords"><div class="field-container"><th class="field_label "
    id="field_label_keywords">


  <a 
      title="You can add keywords from a defined list to bugs, in order to easily identify and group them."
      class="field_help_link field-label"
      href="describekeywords.cgi"
  >Keywords</a>

</th>
  <span class="field_value "
      id="field_container_keywords" >InRadar

</span>
</div>
    </div>
    
    
    <div class="section-dependson"><th class="field_label "
    id="field_label_dependson">


  <a 
      title="The bugs listed here must be resolved before this bug can be resolved."
      class="field_help_link field-label"
      href="page.cgi?id=fields.html#dependson"
  >Depends on</a>

</th>

  <div class="dependencies-block">
    <span id="dependson_input_area">
    </span>

  </div>
  </div>
  
  <div class="section-blocks"><th class="field_label "
    id="field_label_blocked">


  <a 
      title="This bug must be resolved before the bugs listed in this field can be resolved."
      class="field_help_link field-label"
      href="page.cgi?id=fields.html#blocked"
  >Blocks</a>

</th>

  <div class="dependencies-block">
    <span id="blocked_input_area">
    </span>

  </div>
  </div>
    <div class="section-see-also"><div class="field-container"><th class="field_label "
    id="field_label_see_also">


  <a 
      title="This allows you to refer to bugs in other installations. You can enter a URL to a bug in the 'Add Bug URLs' field to note that that bug is related to this one. You can enter multiple URLs at once by separating them with whitespace. You should normally use this field to refer to bugs in other installations. For bugs in this installation, it is better to use the Depends on and Blocks fields."
      class="field_help_link field-label"
      href="page.cgi?id=fields.html#see_also"
  >See Also</a>

</th>
  <span class="field_value "
      id="field_container_see_also" >

</span>
</div>
    </div> 
    
    
    
    <div class="section-aliases"><th class="field_label "
    id="field_label_alias">


  <a 
      title="A short, unique name assigned to a bug in order to assist with looking it up and referring to it in other places in Bugzilla."
      class="field_help_link field-label"
      href="page.cgi?id=fields.html#alias"
  >Alias</a>

</th>
    <div>
        <span class="none">None</span>
    </div>
  </div>
   
  </aside>

</form>

<hr>
<ul class="related_actions">
    <li><a href="#" class="button small">Top of Page </a></li>
    <li><a href="show_bug.cgi?format=multiple&amp;id=251757" class="button small">Format For Printing</a></li>
    <li><a href="show_bug.cgi?ctype=xml&amp;id=251757" class="button small">XML</a></li>
    <li><a href="enter_bug.cgi?cloned_bug_id=251757" class="button small">Clone This Bug</a></li>
    
    </ul>

<br>
</section>
    </main>

    <div id="footer">
      <div class="intro"></div>
<ul id="useful-links">
  <li id="links-actions"><ul class="links">
  <li class="new-bug"><a href="enter_bug.cgi">New</a></li>
  <li class="browse-bugs"><a href="describecomponents.cgi">Browse</a></li>
  <li class="advanced-search"><a href="query.cgi?format=advanced">Search+</a></li>


  <li><a href="report.cgi">Reports</a></li>

  <li>
      
        <a href="request.cgi">Requests</a></li>
  </ul>
  </li>

  




  
</ul>

      <div class="outro"></div>
    </div>

    <!-- WEBKIT_CHANGES -->
    <script defer src="/committers-autocomplete.js"></script>
  </body>
</html>