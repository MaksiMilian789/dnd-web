import { Component, Inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDrawerMode } from '@angular/material/sidenav';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subject, switchMap, tap } from 'rxjs';

import { PwaService } from 'src/app/shared/services/pwa-service.service';
import { Wiki, WikiPage, World } from '@core/models';
import { AuthService } from '@core/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorldService } from '@core/services/api/world.service';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { CreateWorldDialogComponent } from 'src/app/master/world/components/create-world-dialog/create-world-dialog.component';
import { CreateWikiDialogComponent } from 'src/app/master/world/wiki/components/create-wiki-dialog/create-wiki-dialog.component';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrl: './wiki.component.scss',
})
export class WikiComponent {
  drawlerMode: MatDrawerMode = 'side';
  openDrawer: boolean = false;

  worldId: number = Number(this._route.snapshot.paramMap.get('worldId'));
  world: Signal<World | null>;

  pageId: number | null = null;
  wikiId: number | null = null;
  wiki: Wiki[] = [];
  create: boolean = false;

  private readonly _refresh$ = new Subject<void>();

  header = new FormControl<string>('', Validators.required);
  text = new FormControl<string>('', Validators.required);

  edit: boolean = false;

  editorConfig: AngularEditorConfig = {
    sanitize: false,
    editable: false,
    minHeight: 'calc(100vh - 480px)',
    maxHeight: 'calc(100vh - 480px)',
    width: '90vw',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Введите текст...',
    toolbarHiddenButtons: [[], ['insertImage', 'insertVideo']],
  };

  public role: string = '';

  constructor(
    @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
    public pwa: PwaService,
    private _worldService: WorldService,
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private _router: Router,
    private _snackbar: MatSnackBar,
  ) {
    this.role = this._router.url.split('/')[1];
    if (pwa.modalPwaPlatform == 'ANDROID') this.drawlerMode = 'over';

    this.world = toSignal(
      this._refresh$.pipe(
        switchMap(() => this._worldService.loadWorld(this.worldId)),
        tap((val) => (this.wiki = val.wiki!)),
      ),
      {
        initialValue: null,
      },
    );
    this.refresh();
  }

  refresh(): void {
    this._refresh$.next();
  }

  selectWikiPage(page: WikiPage): void {
    this.create = false;
    this.edit = false;
    this.disableEditor();
    this.pageId = page.id;
    this.text.setValue(page.text);
    this.header.setValue(page.header);
  }

  addWikiPage(): void {
    this.create = true;
    this.edit = true;
    this.enableEditor();
    this.pageId = null;
    this.text.reset();
    this.header.reset();
  }

  selectWiki(id: number): void {
    this.create = false;
    this.pageId = null;
    this.wikiId = id;
  }

  addWiki(): void {
    this._dialogs
      .open<string>(new PolymorpheusComponent(CreateWikiDialogComponent), {
        size: 'page',
        closeable: true,
      })
      .subscribe((val) => {
        if (val) {
          this._worldService.addWikiPart(val, this.worldId).subscribe(() => {
            this._snackbar.open('Создание раздела успешно.');
            this.refresh();
          });
        }
      });
  }

  editorButtonClick(): void {
    if (this.edit) {
      this.disableEditor();
      if (this.wikiId) {
        this._worldService
          .saveWikiPage(this.wikiId, this.header.value!, this.text.value!, null, this.pageId)
          .subscribe(() => {
            this.refresh();
            if (this.create) {
              this.create = false;
            }
            this._snackbar.open('Сохранение страницы успешно');
          });
      }
    } else {
      this.enableEditor();
    }
    this.edit = !this.edit;
  }

  canSave(): boolean {
    if (this.create || this.pageId) {
      if (this.text.valid && this.header.valid) {
        return true;
      }
      return false;
    }
    return true;
  }

  enableEditor(): void {
    this.editorConfig.showToolbar = true;
    this.editorConfig.minHeight = 'calc(100vh - 480px)';
    this.editorConfig.minHeight = 'calc(100vh - 480px)';
    this.editorConfig.editable = true;
  }

  disableEditor(): void {
    this.editorConfig.showToolbar = false;
    this.editorConfig.minHeight = 'calc(100vh - 370px)';
    this.editorConfig.minHeight = 'calc(100vh - 370px)';
    this.editorConfig.editable = false;
  }

  getWikiPartPages(): WikiPage[] {
    if (this.wikiId) {
      return this.wiki.find((x) => x.id == this.wikiId)!.pages;
    }
    return [];
  }
}
