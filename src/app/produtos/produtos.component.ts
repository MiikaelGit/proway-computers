import { Component, OnInit } from '@angular/core';
import { IProduto, produtos } from '../produtos';
import { ProdutosService } from '../produtos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtos: IProduto[] | undefined;
  constructor(
    private ProdutosService: ProdutosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.produtos = this.ProdutosService.getAll();
    this.route.queryParamMap.subscribe(params => {
      const descricao = params.get("descricao")?.toLocaleLowerCase();
      if(descricao) {
        this.produtos = produtos.filter(produto => produto.descricao.toLocaleLowerCase().includes(descricao));
        return;
      }
      this.produtos = produtos;
    })
  }

}
